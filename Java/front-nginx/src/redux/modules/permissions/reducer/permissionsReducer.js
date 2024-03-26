import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GET_AUTHORIZED_USERS_STARTED =
  "project/permission/GET_AUTHORIZED_USERS_STARTED";
export const GET_AUTHORIZED_USERS_COMPLETED =
  "project/permission/GET_AUTHORIZED_USERS_COMPLETED";
export const GET_AUTHORIZED_USERS_FAILED =
  "project/permission/GET_AUTHORIZED_USERS_FAILED";

const initialState = {
  permissionsState: {
    error: null,
    requestStatus: requestStatus.none,
    users: [],
    nextPage: 0,
    totalItems: 0,
  },
};

const authorizedLoading = (state = initialState) => ({
  ...state,
  permissionsState: {
    ...initialState.permissionsState,
    requestStatus: requestStatus.loading,
  },
});
const authorizedCompleted = (state = initialState, { payload }) => ({
  ...state,
  permissionsState: {
    ...initialState.permissionsState,
    requestStatus: requestStatus.success,
    users: [...payload.users],
    nextPage: payload.nextPage,
    totalItems: payload.totalItems,
  },
});
const authorizedFailed = (state = initialState, { payload }) => ({
  ...state,
  permissionsState: {
    ...initialState.permissionsState,
    error: payload,
    requestStatus: requestStatus.error,
  },
});

const handlers = {
  [GET_AUTHORIZED_USERS_STARTED]: authorizedLoading,
  [GET_AUTHORIZED_USERS_COMPLETED]: authorizedCompleted,
  [GET_AUTHORIZED_USERS_FAILED]: authorizedFailed,
};

export default createReducer(initialState, handlers);
