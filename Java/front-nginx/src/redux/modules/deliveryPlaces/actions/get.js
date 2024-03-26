import { simpleAction } from "@utils";
import ResponseError from "src/common/entities/ResponseError";
import getDeliveryPlaces from "src/api/deliveryPlaces/get";
import { fromApi } from "src/api/dtos/deliveryPlaces.dto";

export const GET_DELIVERY_PLACES_STARTED = "GET_DELIVERY_PLACES_STARTED";
export const GET_DELIVERY_PLACES_COMPLETED = "GET_DELIVERY_PLACES_COMPLETED";
export const GET_DELIVERY_PLACES_FAILED = "GET_DELIVERY_PLACES_FAILED";

const startAction = simpleAction(GET_DELIVERY_PLACES_STARTED);
const errorAction = simpleAction(GET_DELIVERY_PLACES_FAILED);

export const get = ({
  groupId,
  loggedUserId,
  placeId,
  page,
  size = 10,
} = {}) => async dispatch => {
  try {
    dispatch(startAction());

    const { data } = await getDeliveryPlaces({
      groupId,
      loggedUserId,
      placeId,
      page,
      size,
    });
    const payload = fromApi(data);
    dispatch({
      type: GET_DELIVERY_PLACES_COMPLETED,
      payload,
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(errorAction(errorWithMessage));

    throw errorWithMessage;
  }
};
