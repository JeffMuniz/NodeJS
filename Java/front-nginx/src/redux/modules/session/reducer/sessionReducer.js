import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const SESSION_STARTED = "project/session/SESSION_STARTED";
export const SESSION_COMPLETED = "project/session/SESSION_COMPLETED";
export const SESSION_FAILED = "project/session/SESSION_FAILED";

const initialState = {
  requestStatus: requestStatus.none,
  error: null,
  accessToken: null,
  publicKey: null,
  timestamp: null,
  validatedTimestamp: null,
};

const sessionLoading = (state = initialState) => ({
  ...state,
  requestStatus: requestStatus.loading,
  error: null,
  accessToken: null,
  publicKey: null,
  timestamp: null,
  validatedTimestamp: null,
});

const sessionCompleted = (state = initialState, { payload }) => ({
  ...state,
  requestStatus: requestStatus.success,
  accessToken: payload.accessToken,
  publicKey: payload.publicKey,
  timestamp: payload.timestamp,
  validatedTimestamp: payload.validatedTimestamp,
  error: null,
});

const sessionFailed = (state = initialState, { payload }) => ({
  ...state,
  error: payload,
  requestStatus: requestStatus.error,
  publicKey: null,
  accessToken: null,
  timestamp: null,
  validatedTimestamp: null,
});

const handlers = {
  [SESSION_COMPLETED]: sessionCompleted,
  [SESSION_STARTED]: sessionLoading,
  [SESSION_FAILED]: sessionFailed,
};

export default createReducer(initialState, handlers);
