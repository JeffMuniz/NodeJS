import { requestStatus } from "@enums";

import {
  GET_DELIVERY_PLACES_STARTED,
  GET_DELIVERY_PLACES_COMPLETED,
  GET_DELIVERY_PLACES_FAILED,
} from "src/redux/modules/deliveryPlaces/actions/get";

import {
  GET_DELIVERY_PLACES_ERRORS_STARTED,
  GET_DELIVERY_PLACES_ERRORS_COMPLETED,
  GET_DELIVERY_PLACES_ERRORS_FAILED,
} from "src/redux/modules/deliveryPlaces/actions/errors";

import {
  DELIVERY_PLACES_SITUATION_STARTED,
  DELIVERY_PLACES_SITUATION_SUCCESS,
  DELIVERY_PLACES_SITUATION_FAILED,
} from "src/redux/modules/deliveryPlaces/actions/notifications";

import {
  NEW_DELIVERY_PLACES_STARTED,
  NEW_DELIVERY_PLACES_PROCESSING,
  NEW_DELIVERY_PLACES_COMPLETED,
  NEW_DELIVERY_PLACES_FAILED,
  NEW_DELIVERY_PLACES_RESET,
} from "src/redux/modules/deliveryPlaces/actions/new";

const initialState = {
  newDeliveryPlacesStatus: {
    data: {
      uploadPercent: "0",
    },
    requestStatus: requestStatus.none,
    error: null,
  },
  deliveryPlacesList: {
    data: {},
    requestStatus: requestStatus.none,
    error: null,
  },
  deliveryPlacesSituation: {
    thereIsSheetProcessing: undefined,
    thereIsActiveDP: undefined,
  },
  deliveryPlacesErrors: {
    requestStatus: requestStatus.none,
    data: {},
    error: null,
  },
};

export default function reducer(
  state = initialState,
  { type: actionType, payload } = {},
) {
  switch (actionType) {
    case NEW_DELIVERY_PLACES_STARTED:
      return {
        ...state,
        newDeliveryPlacesStatus: {
          data: {
            uploadPercent: "0",
          },
          error: null,
          requestStatus: requestStatus.loading,
        },
      };
    case NEW_DELIVERY_PLACES_PROCESSING:
      return {
        ...state,
        newDeliveryPlacesStatus: {
          data: {
            uploadPercent: payload,
          },
          error: null,
          requestStatus: requestStatus.loading,
        },
      };
    case NEW_DELIVERY_PLACES_COMPLETED:
      return {
        ...state,
        newDeliveryPlacesStatus: {
          data: {
            uploadPercent: "0",
          },
          error: null,
          requestStatus: requestStatus.success,
        },
      };
    case NEW_DELIVERY_PLACES_FAILED:
      return {
        ...state,
        newDeliveryPlacesStatus: {
          data: {
            uploadPercent: "0",
          },
          error: payload,
          requestStatus: requestStatus.error,
        },
      };
    case NEW_DELIVERY_PLACES_RESET:
      return {
        ...state,
        newDeliveryPlacesStatus: {
          data: {
            uploadPercent: "0",
          },
          requestStatus: requestStatus.none,
          error: null,
        },
      };
    case GET_DELIVERY_PLACES_STARTED:
      return {
        ...state,
        deliveryPlacesList: {
          data: {},
          requestStatus: requestStatus.loading,
          error: null,
        },
      };
    case GET_DELIVERY_PLACES_COMPLETED:
      return {
        ...state,
        deliveryPlacesList: {
          data: payload,
          requestStatus: requestStatus.success,
          error: null,
        },
      };
    case GET_DELIVERY_PLACES_FAILED:
      return {
        ...state,
        deliveryPlacesList: {
          data: {},
          requestStatus: requestStatus.error,
          error: payload,
        },
      };
    case GET_DELIVERY_PLACES_ERRORS_STARTED:
      return {
        ...state,
        deliveryPlacesErrors: {
          requestStatus: requestStatus.loading,
          data: {},
          error: null,
        },
      };
    case GET_DELIVERY_PLACES_ERRORS_COMPLETED:
      return {
        ...state,
        deliveryPlacesErrors: {
          requestStatus: requestStatus.success,
          data: payload,
          error: null,
        },
      };
    case GET_DELIVERY_PLACES_ERRORS_FAILED:
      return {
        ...state,
        deliveryPlacesErrors: {
          requestStatus: requestStatus.failed,
          data: {},
          error: payload,
        },
      };
    case DELIVERY_PLACES_SITUATION_STARTED:
    case DELIVERY_PLACES_SITUATION_FAILED:
      return {
        ...state,
        deliveryPlacesSituation: {
          thereIsSheetProcessing: undefined,
          thereIsActiveDP: undefined,
        },
      };
    case DELIVERY_PLACES_SITUATION_SUCCESS:
      return {
        ...state,
        deliveryPlacesSituation: {
          ...payload,
        },
      };
    default:
      return state;
  }
}
