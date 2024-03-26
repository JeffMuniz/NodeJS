import ResponseError from "src/common/entities/ResponseError";
import * as orderApi from "src/api/order/order";
import { ordersFromApi } from "src/api/dtos/order.dto";
import { orderFromApi } from "src/api/dtos/orderDetails.dto";
import { simpleAction } from "@utils";
import {
  GET_ORDERS_STARTED,
  GET_ORDERS_FAILED,
  GET_ORDERS_COMPLETED,
  GET_ORDERS_RESET,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../reducer/orderReducer";

// Action Creators
const startGetOrders = simpleAction(GET_ORDERS_STARTED)();
const failedGetOrders = simpleAction(GET_ORDERS_FAILED);
const completeGetOrders = simpleAction(GET_ORDERS_COMPLETED);
const resetGetOrders = simpleAction(GET_ORDERS_RESET)();

const completeGetOrder = simpleAction(GET_ORDER_SUCCESS);
const failedGetOrder = simpleAction(GET_ORDER_FAILED);

export const getOrders = (
  {
    userId,
    companyGroupId,
    orderId,
    orderStatus,
    initialDate,
    finalDate,
    page,
  },
  injection,
) => async dispatch => {
  const dependencies = { orderApi, ...injection };
  dispatch(startGetOrders);

  try {
    const { data } = await dependencies.orderApi.getOrders({
      userId,
      companyGroupId,
      orderId,
      orderStatus,
      initialDate,
      finalDate,
      page,
    });

    if (!data) {
      dispatch(completeGetOrders([]));
      return;
    }

    const orders = ordersFromApi(data);

    dispatch(completeGetOrders(orders));

    return orders;
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(failedGetOrders(errorWithMessage));

    throw errorWithMessage;
  }
};

export const resetOrders = () => dispatch => dispatch(resetGetOrders);

export const getOrder = (payload, injection) => async dispatch => {
  const dependencies = { orderApi, ...injection };

  try {
    const { data: result } = await dependencies.orderApi.getOrder(payload);
    const { idGroup } = payload;

    const order = orderFromApi(result, idGroup);

    dispatch(completeGetOrder(order));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(failedGetOrder(errorWithMessage));

    throw errorWithMessage;
  }
};
