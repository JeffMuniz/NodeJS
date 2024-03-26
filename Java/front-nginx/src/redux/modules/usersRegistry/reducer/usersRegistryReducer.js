import { requestStatus } from "@enums";

import {
  SET_SELECTED_USER_COMPLETED,
  SET_SELECTED_USER_STARTED,
  SET_SELECTED_USER_FAILED,
} from "../actions/getAccessHierarchy";

import { CLEAR_USER_REGISTRY } from "../actions/clearUserRegistry";

const initialState = {
  requestStatus: requestStatus.none,
  error: null,
  selectedUser: {},
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SELECTED_USER_STARTED:
      return {
        ...state,
        requestStatus: requestStatus.loading,
      };
    case SET_SELECTED_USER_COMPLETED:
      return {
        ...state,
        requestStatus: requestStatus.success,
        selectedUser: action.payload,
      };
    case SET_SELECTED_USER_FAILED:
      return {
        ...state,
        requestStatus: requestStatus.error,
        error: action.payload,
      };
    case CLEAR_USER_REGISTRY: {
      return {
        ...state,
        selectedUser: {},
      };
    }
    default:
      return state;
  }
}

export default reducer;
