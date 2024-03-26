import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GROUP_STARTED = "project/parentCompany/GROUP_STARTED";
export const GROUP_COMPLETED = "project/parentCompany/GROUP_COMPLETED";
export const GROUP_FAILED = "project/parentCompany/GROUP_FAILED";
export const RESET_GROUP_STATE = "project/parentCompany/RESET_GROUP_STATE";

const initialState = {
  groupState: {
    error: null,
    requestStatus: requestStatus.none,
    groupList: [],
  },
};

const groupLoading = (state = initialState) => ({
  ...state,
  groupState: {
    ...initialState.groupState,
    requestStatus: requestStatus.loading,
  },
});

const groupCompleted = (state = initialState, { payload }) => ({
  ...state,
  groupState: {
    ...initialState.groupState,
    requestStatus: requestStatus.success,
    groupList: [...payload],
  },
});

const groupFailed = (state = initialState, { payload }) => ({
  ...state,
  groupState: {
    ...initialState.groupState,
    requestStatus: requestStatus.error,
    error: payload,
  },
});

const resetGroupState = (state = initialState) => ({
  ...state,
  groupState: initialState.groupState,
});

const handlers = {
  [GROUP_STARTED]: groupLoading,
  [GROUP_COMPLETED]: groupCompleted,
  [GROUP_FAILED]: groupFailed,
  [RESET_GROUP_STATE]: resetGroupState,
};

export default createReducer(initialState, handlers);
