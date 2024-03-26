import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GET_INVOICES_STARTED = "project/finances/GET_INVOICES_STARTED";
export const GET_INVOICES_FAILED = "project/finances/GET_INVOICES_FAILED";
export const GET_INVOICES_COMPLETED = "project/finances/GET_INVOICES_COMPLETED";
export const GET_SELECTED_INVOICE_STARTED =
  "project/finances/GET_SELECTED_INVOICES_STARTED";
export const GET_SELECTED_INVOICE_FAILED =
  "project/finances/GET_SELECTED_INVOICES_FAILED";
export const GET_SELECTED_INVOICE_COMPLETED =
  "project/finances/GET_SELECTED_INVOICES_COMPLETED";
export const SELECT_INVOICE = "project/finances/SELECT_INVOICE";
export const RESET_INVOICES = "project/finances/RESET_INVOICES";
export const RESET_SELECTED_INVOICES =
  "project/finances/RESET_SELECTED_INVOICES";

export const FIND_ALL_INCOME_REPORTS_STARTED =
  "project/finances/FIND_ALL_INCOME_REPORTS_STARTED";
export const FIND_ALL_INCOME_REPORTS_FAILED =
  "project/finances/FIND_ALL_INCOME_REPORTS_FAILED";
export const FIND_ALL_INCOME_REPORTS_COMPLETED =
  "project/finances/FIND_ALL_INCOME_REPORTS_COMPLETED";

const initialState = {
  invoices: {
    data: {},
    requestStatus: requestStatus.loading,
    error: null,
  },
  selectedInvoice: {},
  selectedInvoiceData: {
    data: {},
    requestStatus: requestStatus.loading,
    error: null,
  },
  incomeReports: {
    data: {},
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

const setSelectedLoading = (state = initialState) => ({
  ...state,
  selectedInvoiceData: {
    requestStatus: requestStatus.loading,
  },
});

const setSelectedFailed = (state = initialState, { payload }) => ({
  ...state,
  selectedInvoiceData: {
    requestStatus: requestStatus.error,
    error: payload,
  },
});

const setSelectedCompleted = (state = initialState, { payload }) => ({
  ...state,
  selectedInvoiceData: {
    error: null,
    requestStatus: requestStatus.success,
    data: payload,
  },
});

const selectInvoice = (state = initialState, { payload }) => ({
  ...state,
  selectedInvoice: payload,
});

const resetInvoice = (state = initialState) => ({
  ...state,
  invoices: initialState.invoices,
});

const resetSelectedInvoices = (state = initialState) => ({
  ...state,
  selectedInvoiceData: initialState.selectedInvoiceData,
});

const setIncomeReports = (state = initialState, { payload }) => ({
  ...state,
  incomeReports: {
    error: null,
    requestStatus: requestStatus.success,
    data: payload,
  },
});

const setIncomeReportsError = (state = initialState, { payload }) => ({
  ...state,
  incomeReports: {
    error: payload,
    requestStatus: requestStatus.error,
    data: {},
  },
});

const handlers = {
  [SELECT_INVOICE]: selectInvoice,
  [GET_INVOICES_STARTED]: setLoading("invoices"),
  [GET_INVOICES_COMPLETED]: setCompleted("invoices"),
  [GET_INVOICES_FAILED]: setFailed("invoices"),
  [GET_SELECTED_INVOICE_STARTED]: setSelectedLoading,
  [GET_SELECTED_INVOICE_COMPLETED]: setSelectedCompleted,
  [GET_SELECTED_INVOICE_FAILED]: setSelectedFailed,
  [RESET_INVOICES]: resetInvoice,
  [RESET_SELECTED_INVOICES]: resetSelectedInvoices,

  [FIND_ALL_INCOME_REPORTS_STARTED]: setLoading("incomeReports"),
  [FIND_ALL_INCOME_REPORTS_COMPLETED]: setIncomeReports,
  [FIND_ALL_INCOME_REPORTS_FAILED]: setIncomeReportsError,
};

export default createReducer(initialState, handlers);
