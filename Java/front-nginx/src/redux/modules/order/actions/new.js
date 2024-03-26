import * as orderApi from "src/api/order/order";
import { simpleAction } from "@utils";
import {
  NEW_ORDER_STARTED,
  NEW_ORDER_PROCESSING,
  NEW_ORDER_COMPLETED,
  NEW_ORDER_FAILED,
  NEW_ORDER_RESET,
} from "../reducer/orderReducer";

// Action Creators
const startNewOrder = simpleAction(NEW_ORDER_STARTED)();
const processedNewOrder = simpleAction(NEW_ORDER_PROCESSING);
const completeNewOrder = simpleAction(NEW_ORDER_COMPLETED)();
const failedNewOrder = simpleAction(NEW_ORDER_FAILED);
const resetedNewOrder = simpleAction(NEW_ORDER_RESET)();

export const newOrder = (payload, injection) => async dispatch => {
  const dependencies = { api: orderApi, ...injection };
  dispatch(startNewOrder);

  const uploadProgress = percent => dispatch(processedNewOrder(percent));

  await dependencies.api.newOrder({
    payload,
    uploadProgress,
    onSuccess: () => {
      dispatch(completeNewOrder);
    },
    onError: sendingError => {
      const responseError = {
        message: sendingError,
        code: 0,
        type: "",
      };

      dispatch(failedNewOrder(responseError));
    },
  });
};

export const resetNewOrder = () => dispatch => dispatch(resetedNewOrder);
