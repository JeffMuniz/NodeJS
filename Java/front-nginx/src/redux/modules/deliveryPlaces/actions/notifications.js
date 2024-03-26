import { getDeliveryPlaceNotifications } from "src/api/notifications/notifications";
import { situationFromApi } from "src/api/dtos/deliveryPlaces.dto.js";
import { simpleAction } from "@utils";
import store from "src/redux/configureStore";

export const DELIVERY_PLACES_SITUATION_STARTED =
  "DELIVERY_PLACES_SITUATION_STARTED";
export const DELIVERY_PLACES_SITUATION_SUCCESS =
  "DELIVERY_PLACES_SITUATION_SUCCESS";
export const DELIVERY_PLACES_SITUATION_FAILED =
  "DELIVERY_PLACES_SITUATION_FAILED";

const situationSuccessStarted = simpleAction(DELIVERY_PLACES_SITUATION_STARTED);
const situationSuccessSuccess = simpleAction(DELIVERY_PLACES_SITUATION_SUCCESS);
const situationSuccessFailed = simpleAction(DELIVERY_PLACES_SITUATION_FAILED);

export const getNotifications = () => async dispatch => {
  const {
    user: {
      profile: {
        data: { id: userId },
      },
    },
    selectedCompanyTree: {
      selectedGroup: { id: groupId },
    },
  } = store.getState();

  try {
    dispatch(situationSuccessStarted());

    const { data } = await getDeliveryPlaceNotifications({
      userId,
      groupId,
    });

    const result = situationFromApi(data);

    dispatch(situationSuccessSuccess(result));

    return result;
  } catch (error) {
    dispatch(situationSuccessFailed());
  }
};
