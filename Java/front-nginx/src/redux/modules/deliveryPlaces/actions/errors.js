import { getDeliveryPlacesErrors as getErrors } from "src/api/deliveryPlaces/getErrors";
import ResponseError from "src/common/entities/ResponseError";
import { simpleAction } from "@utils";
import { deliveryPlacesErrorsFromApi } from "src/api/dtos/deliveryPlaces.dto";

export const GET_DELIVERY_PLACES_ERRORS_STARTED =
  "GET_DELIVERY_PLACES_ERRORS_STARTED";
export const GET_DELIVERY_PLACES_ERRORS_COMPLETED =
  "GET_DELIVERY_PLACES_ERRORS_COMPLETED";
export const GET_DELIVERY_PLACES_ERRORS_FAILED =
  "GET_DELIVERY_PLACES_ERRORS_FAILED";

const startGetDeliveryPlacesErrors = simpleAction(
  GET_DELIVERY_PLACES_ERRORS_STARTED,
)();
const completeGetDeliveryPlacesErrors = simpleAction(
  GET_DELIVERY_PLACES_ERRORS_COMPLETED,
);
const failedGetDeliveryPlacesErrors = simpleAction(
  GET_DELIVERY_PLACES_ERRORS_FAILED,
);

export const getDeliveryPlacesErrors = (
  { fileId, page = 0, size = 10, groupId, loggedUserId },
  injection,
) => async dispatch => {
  const dependencies = { getErrors, ...injection };
  dispatch(startGetDeliveryPlacesErrors);
  try {
    const { data: result } = await dependencies.getErrors({
      fileId,
      page,
      size,
      groupId,
      loggedUserId,
    });
    const errors = deliveryPlacesErrorsFromApi(result);

    dispatch(completeGetDeliveryPlacesErrors(errors));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(failedGetDeliveryPlacesErrors(errorWithMessage));

    throw errorWithMessage;
  }
};
