import { omit } from "lodash";
import ResponseError from "src/common/entities/ResponseError";
import { simpleAction, toOnlyNumbers } from "@utils";
import { layoutTypes } from "@enums";
import { uploadTicketNewOrder, getLayoutFromFile } from "src/api/files/files";
import {
  NEW_ORDER_STARTED,
  NEW_ORDER_COMPLETED,
  NEW_ORDER_FAILED,
} from "../reducer/orderReducer";

// Action Creators
const startNewOrder = simpleAction(NEW_ORDER_STARTED)();
const completeNewOrder = simpleAction(NEW_ORDER_COMPLETED)();
const failedNewOrder = simpleAction(NEW_ORDER_FAILED);

export const newOrderFromTxt = ({
  formSubmittedData,
  payload,
  clientCodes,
}) => async dispatch => {
  dispatch(startNewOrder);
  try {
    const layout = await getLayoutFromFile(payload.file);

    const formData = omit(formSubmittedData, ["file"]);

    switch (layout) {
      case layoutTypes.ALELO:
        await uploadTicketNewOrder(payload.file, layout, {}, false, payload);
        return dispatch(completeNewOrder);

      case layoutTypes.VB:
        await uploadTicketNewOrder(
          payload.file,
          layout,
          { dataPedido: formSubmittedData.dataPedido },
          false,
          payload,
        );
        return dispatch(completeNewOrder);

      default:
        await uploadTicketNewOrder(
          payload.file,
          layout,
          {
            codigos: Object.keys(formData).map((key, index) => ({
              codigo: clientCodes[index],
              cnpj: toOnlyNumbers(formSubmittedData[key]),
            })),
          },
          true,
          payload,
        );

        return dispatch(completeNewOrder);
    }
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(failedNewOrder(errorWithMessage));
  }
};
