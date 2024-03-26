import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const CANCEL_ORDER_STARTED = "project/order/CANCEL_ORDER_STARTED";
export const CANCEL_ORDER_FAILED = "project/order/CANCEL_ORDER_FAILED";
export const CANCEL_ORDER_COMPLETED = "project/order/CANCEL_ORDER_COMPLETED";
export const ORDER_TO_CANCEL = "project/order/ORDER_TO_CANCEL";
export const UNSET_ORDER_TO_CANCEL = "project/order/UNSET_ORDER_TO_CANCEL";
export const CANCEL_ORDER_RESET = "project/order/CANCEL_ORDER_RESET";
export const GET_ORDER_STARTED = "project/order/GET_ORDER_STARTED";
export const GET_ORDER_FAILED = "project/order/GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "project/order/GET_ORDER_SUCCESS";
export const GET_ORDER_ERRORS_STARTED =
  "project/order/GET_ORDER_ERRORS_STARTED";
export const GET_ORDER_ERRORS_COMPLETED =
  "project/order/GET_ORDER_ERRORS_COMPLETED";
export const GET_ORDER_ERRORS_FAILED = "project/order/GET_ORDER_ERRORS_FAILED";
export const GET_ORDER_DETAILS_STARTED =
  "project/order/GET_ORDER_DETAILS_STARTED";
export const GET_ORDER_DETAILS_FAILED =
  "project/order/GET_ORDER_DETAILS_FAILED";
export const GET_ORDER_DETAILS_SUCCESS =
  "project/order/GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_BY_COMPANY_STARTED =
  "project/order/GET_ORDER_DETAILS_BY_COMPANY_STARTED";
export const GET_ORDER_DETAILS_BY_COMPANY_COMPLETED =
  "project/order/GET_ORDER_DETAILS_BY_COMPANY_COMPLETED";
export const GET_ORDER_DETAILS_BY_COMPANY_FAILED =
  "project/order/GET_ORDER_DETAILS_BY_COMPANY_FAILED";
export const GET_ORDER_DETAIL_STARTED =
  "project/order/GET_ORDER_DETAIL_STARTED";
export const GET_ORDER_DETAIL_COMPLETED =
  "project/order/GET_ORDER_DETAIL_COMPLETED";
export const GET_ORDER_DETAIL_FAILED = "project/order/GET_ORDER_DETAIL_FAILED";
export const NEW_ORDER_STARTED = "project/order/NEW_ORDER_STARTED";
export const NEW_ORDER_PROCESSING = "project/order/NEW_ORDER_PROCESSING";
export const NEW_ORDER_COMPLETED = "project/order/NEW_ORDER_COMPLETED";
export const NEW_ORDER_FAILED = "project/order/NEW_ORDER_FAILED";
export const NEW_ORDER_RESET = "project/order/NEW_ORDER_RESET";
export const GET_ORDERS_STARTED = "project/order/GET_ORDERS_STARTED";
export const GET_ORDERS_FAILED = "project/order/GET_ORDERS_FAILED";
export const GET_ORDERS_COMPLETED = "project/order/GET_ORDERS_COMPLETED";
export const GET_ORDERS_RESET = "project/order/GET_ORDERS_RESET";
export const CHECK_FOR_TEDS_ISSUE_COMPLETED =
  "project/order/CHECK_FOR_TEDS_ISSUE_COMPLETED";
export const CHECK_FOR_TEDS_ISSUE_FAILED =
  "project/order/CHECK_FOR_TEDS_ISSUE_FAILED";
export const CANCEL_CHARGE_STARTED =
  "project/chargeDashboard/CANCEL_CHARGE_STARTED";
export const CANCEL_CHARGE_FAILED =
  "project/chargeDashboard/CANCEL_CHARGE_FAILED";
export const CANCEL_CHARGE_COMPLETED =
  "project/chargeDashboard/CANCEL_CHARGE_COMPLETED";
export const CHARGE_TO_CANCEL = "project/chargeDashboard/CHARGE_TO_CANCEL";
export const UNSET_CHARGE_TO_CANCEL =
  "project/chargeDashboard/UNSET_CHARGE_TO_CANCEL";
export const CANCEL_CHARGE_RESET =
  "project/chargeDashboard/CANCEL_CHARGE_RESET";

const initialState = {
  cancel: {
    requestStatus: requestStatus.none,
    orderToCancel: "",
    error: "",
  },
  cancelCharge: {
    requestStatus: requestStatus.none,
    chargeToCancel: {},
    error: {},
  },
  newOrderStatus: {
    data: {
      uploadPercent: "0",
    },
    requestStatus: requestStatus.none,
    error: null,
  },
  orders: {
    data: {},
    requestStatus: requestStatus.loading,
    error: null,
  },
  orderStatus: {
    data: {},
    requestStatus: requestStatus.none,
    error: null,
  },
  orderDetailsStatus: {
    data: {},
    requestStatus: requestStatus.none,
    error: null,
  },
  detailsByCompany: {
    data: {},
    requestStatus: requestStatus.none,
    error: null,
  },
  details: {
    data: {},
    requestStatus: requestStatus.none,
    error: null,
  },
  errors: {
    requestStatus: requestStatus.none,
    error: null,
    data: {},
  },
  tedIssue: {
    requestStatus: requestStatus.none,
    error: null,
    data: {},
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

const setCancelCompleted = (state = initialState) => ({
  ...state,
  cancel: {
    ...state.cancel,
    requestStatus: requestStatus.success,
  },
});

const orderToCancel = (state = initialState, { payload }) => ({
  ...state,
  cancel: {
    ...state.cancel,
    orderToCancel: payload,
  },
});

const unsetOrderToCancel = (state = initialState) => ({
  ...state,
  cancel: {
    ...state.cancel,
    orderToCancel: "",
  },
});

const chargeToCancel = (state = initialState, { payload }) => ({
  ...state,
  cancelCharge: {
    ...state.cancelCharge,
    chargeToCancel: payload,
  },
});

const unsetChargeToCancel = (state = initialState) => ({
  ...state,
  cancelCharge: {
    ...state.cancelCharge,
    chargeToCancel: {},
  },
});

const setCancelChargeCompleted = (state = initialState) => ({
  ...state,
  cancelCharge: {
    ...state.cancelCharge,
    requestStatus: requestStatus.success,
  },
});

const newOrderProcessing = (state = initialState, { payload }) => ({
  ...state,
  newOrderStatus: {
    ...initialState.newOrderStatus,
    data: {
      uploadPercent: payload,
    },
    requestStatus: requestStatus.loading,
  },
});

const newOrderCompleted = (state = initialState) => ({
  ...state,
  newOrderStatus: {
    ...initialState.newOrderStatus,
    requestStatus: requestStatus.success,
  },
});

const tedsIssueCompleted = (state = initialState, { payload }) => ({
  ...state,
  tedIssue: {
    data: payload,
    requestStatus: requestStatus.success,
    error: null,
  },
});

const tedsIssueFailed = (state = initialState, { payload }) => ({
  ...state,
  tedIssue: {
    data: {},
    requestStatus: requestStatus.error,
    error: payload,
  },
});

const handlers = {
  [CANCEL_ORDER_STARTED]: setLoading("cancel"),
  [CANCEL_ORDER_FAILED]: setFailed("cancel"),
  [CANCEL_ORDER_COMPLETED]: setCancelCompleted,
  [ORDER_TO_CANCEL]: orderToCancel,
  [UNSET_ORDER_TO_CANCEL]: unsetOrderToCancel,
  [CANCEL_ORDER_RESET]: reset("cancel"),
  [GET_ORDER_STARTED]: setLoading("orderStatus"),
  [GET_ORDER_FAILED]: setFailed("orderStatus"),
  [GET_ORDER_SUCCESS]: setCompleted("orderStatus"),
  [GET_ORDER_ERRORS_STARTED]: setLoading("errors"),
  [GET_ORDER_ERRORS_COMPLETED]: setCompleted("errors"),
  [GET_ORDER_ERRORS_FAILED]: setFailed("errors"),
  [GET_ORDER_DETAILS_STARTED]: setLoading("orderDetailsStatus"),
  [GET_ORDER_DETAILS_FAILED]: setFailed("orderDetailsStatus"),
  [GET_ORDER_DETAILS_SUCCESS]: setCompleted("orderDetailsStatus"),
  [GET_ORDER_DETAILS_BY_COMPANY_STARTED]: setLoading("detailsByCompany"),
  [GET_ORDER_DETAILS_BY_COMPANY_COMPLETED]: setCompleted("detailsByCompany"),
  [GET_ORDER_DETAILS_BY_COMPANY_FAILED]: setFailed("detailsByCompany"),
  [GET_ORDER_DETAIL_STARTED]: setLoading("details"),
  [GET_ORDER_DETAIL_COMPLETED]: setCompleted("details"),
  [GET_ORDER_DETAIL_FAILED]: setFailed("details"),
  [NEW_ORDER_STARTED]: setLoading("newOrderStatus"),
  [NEW_ORDER_PROCESSING]: newOrderProcessing,
  [NEW_ORDER_COMPLETED]: newOrderCompleted,
  [NEW_ORDER_FAILED]: setFailed("newOrderStatus"),
  [NEW_ORDER_RESET]: reset("newOrderStatus"),
  [GET_ORDERS_STARTED]: setLoading("orders"),
  [GET_ORDERS_FAILED]: setFailed("orders"),
  [GET_ORDERS_COMPLETED]: setCompleted("orders"),
  [GET_ORDERS_RESET]: reset("orders"),
  [CHECK_FOR_TEDS_ISSUE_COMPLETED]: tedsIssueCompleted,
  [CHECK_FOR_TEDS_ISSUE_FAILED]: tedsIssueFailed,
  [CHARGE_TO_CANCEL]: chargeToCancel,
  [UNSET_CHARGE_TO_CANCEL]: unsetChargeToCancel,
  [CANCEL_CHARGE_STARTED]: setLoading("cancelCharge"),
  [CANCEL_CHARGE_COMPLETED]: setCancelChargeCompleted,
  [CANCEL_CHARGE_FAILED]: setFailed("cancelCharge"),
  [CANCEL_CHARGE_RESET]: reset("cancelCharge"),
};

export default createReducer(initialState, handlers);
