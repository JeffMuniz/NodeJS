import * as deliveryPlacesApi from "src/api/deliveryPlaces/deliveryPlaces";
import ResponseError from "src/common/entities/ResponseError";

import { simpleAction } from "@utils";

export const NEW_DELIVERY_PLACES_STARTED =
  "project/deliveryPlaces/NEW_DELIVERY_PLACES_STARTED";
export const NEW_DELIVERY_PLACES_PROCESSING =
  "project/deliveryPlaces/NEW_DELIVERY_PLACES_PROCESSING";
export const NEW_DELIVERY_PLACES_COMPLETED =
  "project/deliveryPlaces/NEW_DELIVERY_PLACES_COMPLETED";
export const NEW_DELIVERY_PLACES_FAILED =
  "project/deliveryPlaces/NEW_DELIVERY_PLACES_FAILED";
export const NEW_DELIVERY_PLACES_RESET =
  "project/deliveryPlaces/NEW_DELIVERY_PLACES_RESET";

const startNewDeliveryPlaces = simpleAction(NEW_DELIVERY_PLACES_STARTED);
const processedNewDeliveryPlaces = simpleAction(NEW_DELIVERY_PLACES_PROCESSING);
const completeNewDeliveryPlaces = simpleAction(NEW_DELIVERY_PLACES_COMPLETED);
const failedNewDeliveryPlaces = simpleAction(NEW_DELIVERY_PLACES_FAILED);
const resetedNewDeliveryPlaces = simpleAction(NEW_DELIVERY_PLACES_RESET);

export const newDeliveryPlaces = (payload, injection) => async dispatch => {
  const dependencies = { api: deliveryPlacesApi, ...injection };
  dispatch(startNewDeliveryPlaces());

  try {
    const uploadProgress = percent =>
      dispatch(processedNewDeliveryPlaces(percent));

    await dependencies.api.newDeliveryPlaces(payload, uploadProgress);

    return dispatch(completeNewDeliveryPlaces());
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(failedNewDeliveryPlaces(errorWithMessage));
  }
};

export const resetNewDeliveryPlaces = () => dispatch =>
  dispatch(resetedNewDeliveryPlaces());
