import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const COMPANY_STARTED = "project/companies/COMPANY_STARTED";
export const COMPANY_COMPLETED = "project/companies/COMPANY_COMPLETED";
export const COMPANY_FAILED = "project/companies/COMPANY_FAILED";
export const RESET_COMPANIES_STATE = "project/companies/RESET_COMPANIES_STATE";

const initialState = {
  companyState: {
    error: null,
    requestStatus: requestStatus.none,
    companyList: [],
    nextPage: 0,
  },
};

const companyFailed = (state = initialState, { payload }) => ({
  ...state,
  companyState: {
    ...initialState.companyState,
    error: payload,
    requestStatus: requestStatus.error,
    nextPage: state.companyState.nextPage,
  },
});

const companyStarted = (state = initialState) => ({
  ...state,
  companyState: {
    ...initialState.companyState,
    requestStatus: requestStatus.loading,
    nextPage: state.companyState.nextPage,
  },
});

const companyCompleted = (state = initialState, { payload }) => ({
  ...state,
  companyState: {
    ...initialState.companyState,
    requestStatus: requestStatus.success,
    companyList: [...state.companyState.companyList, ...payload.content],
    nextPage: payload.nextPage,
  },
});

const resetCompany = (state = initialState) => ({
  ...state,
  companyState: {
    ...initialState.companyState,
  },
});

const handlers = {
  [COMPANY_STARTED]: companyStarted,
  [COMPANY_COMPLETED]: companyCompleted,
  [COMPANY_FAILED]: companyFailed,
  [RESET_COMPANIES_STATE]: resetCompany,
};

export default createReducer(initialState, handlers);
