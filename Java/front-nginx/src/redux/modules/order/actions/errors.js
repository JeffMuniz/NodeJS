import * as orderApi from "src/api/order/order";
import ResponseError from "src/common/entities/ResponseError";
import { simpleAction } from "@utils";
import { orderErrorsFromApi } from "src/api/dtos/orderDetails.dto";
import {
  GET_ORDER_ERRORS_STARTED,
  GET_ORDER_ERRORS_COMPLETED,
  GET_ORDER_ERRORS_FAILED,
} from "../reducer/orderReducer";

const startGetOrderErrors = simpleAction(GET_ORDER_ERRORS_STARTED)();
const completeGetOrderErrors = simpleAction(GET_ORDER_ERRORS_COMPLETED);
const failedGetOrderErrors = simpleAction(GET_ORDER_ERRORS_FAILED);

export const getOrderErrors = (
  { fileId, page = 0, size = 10 },
  injection,
) => async dispatch => {
  const dependencies = { orderApi, ...injection };
  dispatch(startGetOrderErrors);
  try {
    const { data: result } = await dependencies.orderApi.getOrderErrors({
      fileId,
      page,
      size,
    });
    const errors = orderErrorsFromApi(result);

    dispatch(completeGetOrderErrors(errors));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(failedGetOrderErrors(errorWithMessage));

    throw errorWithMessage;
  }
};
