import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GET_TRACKING_STARTED = "project/card/GET_TRACKING_STARTED";
export const GET_TRACKING_COMPLETED = "project/card/GET_TRACKING_COMPLETED";
export const GET_TRACKING_FAILED = "project/card/GET_TRACKING_FAILED";
export const RESET_TRACKING = "project/card/RESET_TRACKING";

const initialState = {
  tracking: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: undefined,
  },
};

const setLoading = key => (state = initialState) => ({
  ...state,
  [key]: { ...initialState[key], requestStatus: requestStatus.loading },
});

const setFailed = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    error: payload,
    requestStatus: requestStatus.error,
  },
});

const setCompleted = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    data: payload,
    requestStatus: requestStatus.success,
  },
});

const reset = key => (state = initialState) => ({
  ...state,
  [key]: initialState[key],
});

const handlers = {
  [GET_TRACKING_STARTED]: setLoading("tracking"),
  [GET_TRACKING_COMPLETED]: setCompleted("tracking"),
  [GET_TRACKING_FAILED]: setFailed("tracking"),
  [RESET_TRACKING]: reset("tracking"),
};

export default createReducer(initialState, handlers);
