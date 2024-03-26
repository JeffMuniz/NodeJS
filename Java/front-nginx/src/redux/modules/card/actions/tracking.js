import last from "lodash/last";
import get from "lodash/get";
import ResponseError from "src/common/entities/ResponseError";
import { simpleAction } from "@utils";

import { getTrackingsByCPF } from "src/api/card/card";
import * as voucherApi from "src/api/voucher/voucher";

import CardTrackingDto from "src/api/dtos/cardTracking.dto";

import {
  GET_TRACKING_STARTED,
  GET_TRACKING_COMPLETED,
  GET_TRACKING_FAILED,
  RESET_TRACKING,
} from "../reducer/cardReducer";

const trackingStart = simpleAction(GET_TRACKING_STARTED)();
const trackingCompleted = simpleAction(GET_TRACKING_COMPLETED);
const trackingFailed = simpleAction(GET_TRACKING_FAILED);
const resetTrackingAction = simpleAction(RESET_TRACKING)();

export const getCardsTracking = ({ cpf, cnpj }) => async dispatch => {
  dispatch(trackingStart);

  try {
    const vouchersResponse = await voucherApi.getVouchers({
      cpf,
      cnpj,
    });

    const cards = get(vouchersResponse, "data.cartoes", []);

    const responseTracking = await getTrackingsByCPF(cpf);
    const trackings = get(responseTracking, "data.rastreamentos", []);

    const CARD_LOCKED_STATUS = 2;

    const payload = cards
      .filter(card => card.idStatus === CARD_LOCKED_STATUS)
      .map(card => {
        const foundTracking =
          trackings.find(tracking => tracking.idCartao === card.id) || {};

        const codigoRastreio = get(foundTracking, "codigoRastreio", "");
        const lastEvent = last(foundTracking.eventos);
        const trackStatus = get(lastEvent, "descricao", "Cartão em geração");

        const addressObject = get(foundTracking, "endereco", {});
        const endereco = Object.values(addressObject).join(" - ");

        const withNewProperties = {
          ...card,
          codigoRastreio,
          endereco,
          trackStatus,
        };

        return CardTrackingDto.fromApi(withNewProperties);
      });

    dispatch(trackingCompleted(payload));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(trackingFailed(errorWithMessage));
    throw errorWithMessage;
  }
};

export const resetTracking = () => dispatch => dispatch(resetTrackingAction);
