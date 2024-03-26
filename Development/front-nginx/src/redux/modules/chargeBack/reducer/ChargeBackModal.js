import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const CHARGEBACK_REQUEST_TERMS_INFO_STARTED =
  "project/chargeback/CHARGEBACK_REQUEST_TERMS_INFO_STARTED";
export const CHARGEBACK_REQUEST_TERMS_INFO_COMPLETED =
  "project/chargeback/CHARGEBACK_REQUEST_TERMS_INFO_COMPLETED";
export const CHARGEBACK_REQUEST_TERMS_INFO_FAILED =
  "project/chargeback/CHARGEBACK_REQUEST_TERMS_INFO_FAILED";

const initialState = {
  chargebackTerms: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
};

const setLoading = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.loading,
  },
});

const setSuccess = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    requestStatus: requestStatus.success,
    ...payload,
  },
});

const setFailed = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    requestStatus: requestStatus.error,
    payload,
  },
});

const handlers = {
  [CHARGEBACK_REQUEST_TERMS_INFO_STARTED]: setLoading("chargebackTerms"),
  [CHARGEBACK_REQUEST_TERMS_INFO_COMPLETED]: setSuccess("chargebackTerms"),
  [CHARGEBACK_REQUEST_TERMS_INFO_FAILED]: setFailed("chargebackTerms"),
};

export default createReducer(initialState, handlers);
