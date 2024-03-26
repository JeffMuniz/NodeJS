import * as orderApi from "src/api/order/order";
import ResponseError from "src/common/entities/ResponseError";
import { simpleAction } from "@utils";
import {
  ORDER_TO_CANCEL,
  UNSET_ORDER_TO_CANCEL,
  CANCEL_ORDER_STARTED,
  CANCEL_ORDER_COMPLETED,
  CANCEL_ORDER_FAILED,
  CANCEL_ORDER_RESET,
  CANCEL_CHARGE_STARTED,
  CANCEL_CHARGE_FAILED,
  CANCEL_CHARGE_COMPLETED,
  CHARGE_TO_CANCEL,
  UNSET_CHARGE_TO_CANCEL,
  CANCEL_CHARGE_RESET,
} from "../reducer/orderReducer";

const orderToCancel = simpleAction(ORDER_TO_CANCEL);
const unsetOrder = simpleAction(UNSET_ORDER_TO_CANCEL)();
const cancelOrderReset = simpleAction(CANCEL_ORDER_RESET)();
const cancelOrderStarted = simpleAction(CANCEL_ORDER_STARTED)();
const cancelOrderCompleted = simpleAction(CANCEL_ORDER_COMPLETED);
const cancelOrderFailed = simpleAction(CANCEL_ORDER_FAILED);

export const setOrderToCancel = ({ orderId }) => dispatch =>
  dispatch(orderToCancel(orderId));

export const unsetOrderToCancel = () => dispatch => dispatch(unsetOrder);

export const resetCancelState = () => dispatch => dispatch(cancelOrderReset);

export const cancelOrder = ({ orderId, userId }) => async dispatch => {
  dispatch(cancelOrderStarted);

  try {
    const result = await orderApi.cancelOrder({ orderId, userId });

    dispatch(cancelOrderCompleted(result));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(cancelOrderFailed(errorWithMessage));

    throw errorWithMessage;
  }
};

export const setChargeToCancel = ({ chargeId, orderId, userId }) => dispatch =>
  dispatch({
    type: CHARGE_TO_CANCEL,
    payload: { chargeId, orderId, userId },
  });

export const unsetChargeToCancel = () => dispatch =>
  dispatch({
    type: UNSET_CHARGE_TO_CANCEL,
  });

export const resetCancelChargeState = () => dispatch =>
  dispatch({
    type: CANCEL_CHARGE_RESET,
  });

export const cancelCharge = ({
  chargeId,
  orderId,
  userId,
}) => async dispatch => {
  dispatch({ type: CANCEL_CHARGE_STARTED });

  try {
    const result = await orderApi.cancelCharge({ chargeId, orderId, userId });

    dispatch({ type: CANCEL_CHARGE_COMPLETED, payload: result });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({ type: CANCEL_CHARGE_FAILED, payload: errorWithMessage });

    throw errorWithMessage;
  }
};
