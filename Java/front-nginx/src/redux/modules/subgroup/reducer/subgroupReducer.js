import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GET_SUBGROUP_STARTED = "project/subgroup/GET_SUBGROUP_STARTED";
export const GET_SUBGROUP_COMPLETED = "project/subgroup/GET_SUBGROUP_COMPLETED";
export const GET_SUBGROUP_FAILED = "project/subgroup/GET_SUBGROUP_FAILED";
export const RESET_SUBGROUP_STATE = "project/subgroup/RESET_SUBGROUP_STATE";

export const GET_SUBGROUP_TREE_STARTED =
  "project/subgroup/GET_SUBGROUP_TREE_STARTED";
export const GET_SUBGROUP_TREE_COMPLETED =
  "project/subgroup/GET_SUBGROUP_TREE_COMPLETED";
export const GET_SUBGROUP_TREE_FAILED =
  "project/subgroup/GET_SUBGROUP_TREE_FAILED";

const initialState = {
  subgroupState: {
    requestStatus: requestStatus.none,
    error: null,
    idGroup: null,
    subgroups: [],
    totalItems: 0,
    nextPage: 0,
  },
  subgroupTree: {
    error: null,
    requestStatus: requestStatus.none,
    subgroups: [],
  },
};

const subgroupLoading = (state = initialState) => ({
  ...state,
  subgroupState: {
    ...initialState.subgroupState,
    requestStatus: requestStatus.loading,
  },
});

const subgroupCompleted = (state = initialState, { payload }) => ({
  ...state,
  subgroupState: {
    ...initialState.subgroupState,
    requestStatus: requestStatus.success,
    subgroups: payload.subgroups,
    totalItems: payload.totalItems,
    nextPage: payload.nextPage,
  },
});

const subgroupFailed = (state = initialState, { payload }) => ({
  ...state,
  subgroupState: {
    ...initialState.subgroupState,
    error: payload,
    requestStatus: requestStatus.error,
  },
});

const resetSubgroupState = () => ({
  ...initialState,
});

const subgroupTreeStarted = (state = initialState) => ({
  ...state,
  subgroupTree: {
    error: null,
    subgroups: state.subgroupTree.subgroups || [],
    requestStatus: requestStatus.loading,
    nextPage: state.subgroupTree.nextPage,
  },
});

const subgroupTreeCompleted = (state = initialState, { payload }) => ({
  ...state,
  subgroupTree: {
    error: null,
    requestStatus: requestStatus.success,
    subgroups: payload.content,
  },
});

const subgroupTreeFailed = (state = initialState, { payload }) => ({
  ...state,
  subgroupTree: {
    error: payload,
    requestStatus: requestStatus.error,
    subgroups: [],
  },
});

const handlers = {
  [GET_SUBGROUP_STARTED]: subgroupLoading,
  [GET_SUBGROUP_COMPLETED]: subgroupCompleted,
  [GET_SUBGROUP_FAILED]: subgroupFailed,
  [RESET_SUBGROUP_STATE]: resetSubgroupState,
  [GET_SUBGROUP_TREE_STARTED]: subgroupTreeStarted,
  [GET_SUBGROUP_TREE_COMPLETED]: subgroupTreeCompleted,
  [GET_SUBGROUP_TREE_FAILED]: subgroupTreeFailed,
};

export default createReducer(initialState, handlers);
