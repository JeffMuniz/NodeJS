import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GET_VIRTUAL_ACCOUNT_STATEMENT_STARTED =
  "project/finances/GET_VIRTUAL_ACCOUNT_STATEMENT_STARTED";
export const GET_VIRTUAL_ACCOUNT_STATEMENT_FAILED =
  "project/finances/GET_VIRTUAL_ACCOUNT_STATEMENT_FAILED";
export const GET_VIRTUAL_ACCOUNT_STATEMENT_COMPLETED =
  "project/finances/GET_VIRTUAL_ACCOUNT_STATEMENT_COMPLETED";
export const GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_STARTED =
  "project/finances/GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_STARTED";
export const GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_FAILED =
  "project/finances/GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_FAILED";
export const GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_COMPLETED =
  "project/finances/GET_VIRTUAL_ACCOUNT_BALANCE_COMPLETED";
export const GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_STARTED =
  "project/finances/GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_STARTED";
export const GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_FAILED =
  "project/finances/GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_FAILED";
export const GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_COMPLETED =
  "project/finances/GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_COMPLETED";

const initialState = {
  statement: {
    data: {},
    requestStatus: requestStatus.none,
    error: null,
  },
  companyBalance: {
    data: { amount: 0 },
    requestStatus: requestStatus.none,
    error: null,
  },
  groupBalance: {
    data: { amount: 0 },
    requestStatus: requestStatus.none,
    error: null,
  },
};

const setLoading = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.loading,
  },
});

const setFailed = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.error,
    error: payload,
  },
});

const setCompleted = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.success,
    data: payload,
  },
});

const handlers = {
  [GET_VIRTUAL_ACCOUNT_STATEMENT_STARTED]: setLoading("statement"),
  [GET_VIRTUAL_ACCOUNT_STATEMENT_COMPLETED]: setCompleted("statement"),
  [GET_VIRTUAL_ACCOUNT_STATEMENT_FAILED]: setFailed("statement"),
  [GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_STARTED]: setLoading("groupBalance"),
  [GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_COMPLETED]: setCompleted("groupBalance"),
  [GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_FAILED]: setFailed("groupBalance"),
  [GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_STARTED]: setLoading("companyBalance"),
  [GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_COMPLETED]: setCompleted(
    "companyBalance",
  ),
  [GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_FAILED]: setFailed("companyBalance"),
};

export default createReducer(initialState, handlers);
