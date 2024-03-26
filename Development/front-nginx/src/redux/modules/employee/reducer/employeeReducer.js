import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GET_EMPLOYEES_STARTED = "project/employee/GET_EMPLOYEES_STARTED";
export const GET_EMPLOYEES_COMPLETED =
  "project/employee/GET_EMPLOYEES_COMPLETED";
export const GET_EMPLOYEES_FAILED = "project/employee/GET_EMPLOYEES_FAILED";
export const EMPLOYEES_RESET = "project/employee/EMPLOYEES_RESET";
export const GET_EMPLOYEES_COUNT_STARTED =
  "project/employee/GET_EMPLOYEES_COUNT_STARTED";
export const GET_EMPLOYEES_COUNT_COMPLETED =
  "project/employee/GET_EMPLOYEES_COUNT_COMPLETED";
export const GET_EMPLOYEES_COUNT_FAILED =
  "project/employee/GET_EMPLOYEES_COUNT_FAILED";
export const EMPLOYEES_COUNT_RESET = "project/employee/EMPLOYEES_COUNT_RESET";
export const EMPLOYEE_REGISTRY_STARTED =
  "project/employee/EMPLOYEE_REGISTRY_STARTED";
export const EMPLOYEE_REGISTRY_COMPLETED =
  "project/employee/EMPLOYEE_REGISTRY_COMPLETED";
export const EMPLOYEE_REGISTRY_FAILED =
  "project/employee/EMPLOYEE_REGISTRY_FAILED";
export const EMPLOYEE_CHOSEN_ACCOUNT =
  "project/employee/EMPLOYEE_CHOSEN_ACCOUNT";
export const EMPLOYEE_CHOSEN_ACCOUNT_FAILED =
  "project/employee/EMPLOYEE_CHOSEN_ACCOUNT_FAILED";
export const EMPLOYEE_AVAILABLE_ACCOUNTS =
  "project/employee/EMPLOYEE_AVAILABLE_ACCOUNTS";
export const EMPLOYEE_STATEMENTS_STARTED =
  "project/employee/EMPLOYEE_STATEMENTS_STARTED";
export const EMPLOYEE_STATEMENTS_COMPLETED =
  "project/employee/EMPLOYEE_STATEMENTS_COMPLETED";
export const EMPLOYEE_STATEMENTS_FAILED =
  "project/employee/EMPLOYEE_STATEMENTS_FAILED";
export const EMPLOYEE_VOUCHERS_STARTED =
  "project/employee/EMPLOYEE_VOUCHERS_STARTED";
export const EMPLOYEE_VOUCHERS_COMPLETED =
  "project/employee/EMPLOYEE_VOUCHERS_COMPLETED";
export const EMPLOYEE_VOUCHERS_FAILED =
  "project/employee/EMPLOYEE_VOUCHERS_FAILED";

export const GET_CHARGEBACKS_STARTED =
  "project/employee/GET_CHARGEBACKS_STARTED";
export const GET_CHARGEBACKS_STRING = "project/employee/GET_CHARGEBACKS_STRING";
export const GET_CHARGEBACKS_COMPLETED =
  "project/employee/GET_CHARGEBACKS_COMPLETED";
export const GET_CHARGEBACKS_FAILED = "project/employee/GET_CHARGEBACKS_FAILED";

export const GET_EMPLOYEE_CHARGEBACK_INFO_STARTED =
  "project/employee/GET_EMPLOYEE_CHARGEBACK_INFO_STARTED";
export const GET_EMPLOYEE_CHARGEBACK_INFO_COMPLETED =
  "project/employee/GET_EMPLOYEE_CHARGEBACK_INFO_COMPLETED";
export const GET_EMPLOYEE_CHARGEBACK_INFO_FAILED =
  "project/employee/GET_EMPLOYEE_CHARGEBACK_INFO_FAILED";

export const GET_DETAILS_CHARGEBACK_INFO_STARTED =
  "project/employee/GET_DETAILS_CHARGEBACK_INFO_STARTED";
export const GET_DETAILS_CHARGEBACK_INFO_COMPLETED =
  "project/employee/GET_DETAILS_CHARGEBACK_INFO_COMPLETED";
export const GET_DETAILS_CHARGEBACK_INFO_FAILED =
  "project/employee/GET_DETAILS_CHARGEBACK_INFO_FAILED";

export const GET_DETAILS_CHARGEBACK_BODY_STARTED =
  "project/employee/GET_DETAILS_CHARGEBACK_BODY_STARTED";
export const GET_DETAILS_CHARGEBACK_BODY_COMPLETED =
  "project/employee/GET_DETAILS_CHARGEBACK_BODY_COMPLETED";
export const GET_DETAILS_CHARGEBACK_BODY_FAILED =
  "project/employee/GET_DETAILS_CHARGEBACK_BODY_FAILED";

const initialState = {
  registry: {},
  vouchers: {},
  statement: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: {},
  },
  availableAccounts: [],
  chosenAccount: null,
  employees: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: {},
  },
  employeesCount: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: {},
  },
  chargeback: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: {},
  },
  chargebacks: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: {},
  },
  chargebackDetails: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: {},
  },
  chargebackBody: {
    requestStatus: requestStatus.none,
    error: undefined,
    data: {},
  },
};

const setLoading = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.loading,
  },
});

const setCompletedObjectType = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: payload,
});

const setCompleted = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.success,
    data: payload,
  },
});

const setSearchString = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: payload,
});

const setFailedObjectType = key => (state = initialState) => ({
  ...state,
  [key]: {},
});

const setFailed = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.error,
    error: payload,
  },
});

const chosenAccountFailed = (state = initialState) => ({
  ...state,
  chosenAccount: null,
});

const reset = key => (state = initialState) => ({
  ...state,
  [key]: initialState[key],
});

const handlers = {
  [GET_EMPLOYEES_STARTED]: setLoading("employees"),
  [GET_EMPLOYEES_COMPLETED]: setCompleted("employees"),
  [GET_EMPLOYEES_FAILED]: setFailed("employees"),
  [EMPLOYEES_RESET]: reset("employees"),
  [GET_EMPLOYEES_COUNT_STARTED]: setLoading("employeesCount"),
  [GET_EMPLOYEES_COUNT_COMPLETED]: setCompleted("employeesCount"),
  [GET_EMPLOYEES_COUNT_FAILED]: setFailed("employeesCount"),
  [EMPLOYEES_COUNT_RESET]: reset("employeesCount"),
  [EMPLOYEE_REGISTRY_COMPLETED]: setCompletedObjectType("registry"),
  [EMPLOYEE_REGISTRY_FAILED]: setFailedObjectType("registry"),
  [EMPLOYEE_STATEMENTS_STARTED]: setLoading("statement"),
  [EMPLOYEE_STATEMENTS_COMPLETED]: setCompleted("statement"),
  [EMPLOYEE_STATEMENTS_FAILED]: setFailed("statement"),
  [EMPLOYEE_VOUCHERS_STARTED]: setLoading("vouchers"),
  [EMPLOYEE_VOUCHERS_COMPLETED]: setCompletedObjectType("vouchers"),
  [EMPLOYEE_VOUCHERS_FAILED]: setFailed("vouchers"),
  [EMPLOYEE_CHOSEN_ACCOUNT]: setCompletedObjectType("chosenAccount"),
  [EMPLOYEE_CHOSEN_ACCOUNT_FAILED]: chosenAccountFailed("chosenAccount"),
  [EMPLOYEE_AVAILABLE_ACCOUNTS]: setCompletedObjectType("availableAccounts"),
  [GET_CHARGEBACKS_STARTED]: setLoading("chargebacks"),
  [GET_CHARGEBACKS_STRING]: setSearchString("chargebackString"),
  [GET_CHARGEBACKS_COMPLETED]: setCompleted("chargebacks"),
  [GET_CHARGEBACKS_FAILED]: setFailed("chargebacks"),
  [GET_EMPLOYEE_CHARGEBACK_INFO_STARTED]: setLoading("chargeback"),
  [GET_EMPLOYEE_CHARGEBACK_INFO_COMPLETED]: setCompleted("chargeback"),
  [GET_EMPLOYEE_CHARGEBACK_INFO_FAILED]: setFailed("chargeback"),
  [GET_DETAILS_CHARGEBACK_INFO_STARTED]: setLoading("chargebackDetails"),
  [GET_DETAILS_CHARGEBACK_INFO_COMPLETED]: setCompleted("chargebackDetails"),
  [GET_DETAILS_CHARGEBACK_INFO_FAILED]: setFailed("chargebackDetails"),
  [GET_DETAILS_CHARGEBACK_BODY_STARTED]: setLoading("chargebackBody"),
  [GET_DETAILS_CHARGEBACK_BODY_COMPLETED]: setCompleted("chargebackBody"),
  [GET_DETAILS_CHARGEBACK_BODY_FAILED]: setFailed("chargebackBody"),
};

export default createReducer(initialState, handlers);
