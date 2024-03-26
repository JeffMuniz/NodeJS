import * as orderApi from "src/api/order/order";
import ResponseError from "src/common/entities/ResponseError";
import {
  orderDetailsfromApi,
  orderDetailfromApi,
  orderDetailsByCompanyfromApi,
} from "src/api/dtos/orderDetails.dto";

import { simpleAction } from "@utils";
import {
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_BY_COMPANY_STARTED,
  GET_ORDER_DETAILS_BY_COMPANY_COMPLETED,
  GET_ORDER_DETAILS_BY_COMPANY_FAILED,
  GET_ORDER_DETAIL_COMPLETED,
  GET_ORDER_DETAIL_FAILED,
} from "../reducer/orderReducer";

// Action Creators
const completeGetOrderDetails = simpleAction(GET_ORDER_DETAILS_SUCCESS);
const failedGetOrderDetails = simpleAction(GET_ORDER_DETAILS_FAILED);

const startGetDetailsByCompany = simpleAction(
  GET_ORDER_DETAILS_BY_COMPANY_STARTED,
)();
const completeGetDetailsByCompany = simpleAction(
  GET_ORDER_DETAILS_BY_COMPANY_COMPLETED,
);
const failedGetDetailsByCompany = simpleAction(
  GET_ORDER_DETAILS_BY_COMPANY_FAILED,
);

const completeGetOrderDetail = simpleAction(GET_ORDER_DETAIL_COMPLETED);
const failedGetOrderDetail = simpleAction(GET_ORDER_DETAIL_FAILED);

export const getOrderDetails = (payload, injection) => async dispatch => {
  try {
    const dependencies = { orderApi, ...injection };

    const { data: result } = await dependencies.orderApi.getOrderDetails(
      payload,
    );
    const { idGroup, orderId } = payload;

    const order = orderDetailsfromApi(result, idGroup, orderId);

    dispatch(completeGetOrderDetails(order));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(failedGetOrderDetails(errorWithMessage));

    throw errorWithMessage;
  }
};

export const getOrderDetailsByCompany = (
  { idUser, chargeId, page = 0, size = 10 },
  injection,
) => async dispatch => {
  const dependencies = { orderApi, ...injection };
  dispatch(startGetDetailsByCompany);
  try {
    const {
      data: result,
    } = await dependencies.orderApi.getOrderDetailsByCompany({
      idUser,
      chargeId,
      page,
      size,
    });
    const orderDetails = orderDetailsByCompanyfromApi(result);

    dispatch(completeGetDetailsByCompany(orderDetails));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(failedGetDetailsByCompany(errorWithMessage));

    throw errorWithMessage;
  }
};

export const getOrderDetail = (
  { idUser, idGroup, orderId, chargeId },
  injection,
) => async dispatch => {
  const dependencies = { orderApi, ...injection };

  try {
    const {
      data: result,
    } = await dependencies.orderApi.getOrderDetailThirdLevel({
      idUser,
      chargeId,
      idGroup,
      orderId,
    });

    const orderDetails = orderDetailfromApi(result);

    dispatch(completeGetOrderDetail(orderDetails));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(failedGetOrderDetail(errorWithMessage));

    throw errorWithMessage;
  }
};
