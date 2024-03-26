import { createReducer } from "reduxsauce";

export const UPDATE_TREE_STARTED =
  "project/selectedCompanyTree/UPDATE_TREE_STARTED";
export const UPDATE_GROUP_STARTED =
  "project/selectedCompanyTree/UPDATE_GROUP_STARTED";
export const UPDATE_PARENT_COMPANY_STARTED =
  "project/selectedCompanyTree/UPDATE_PARENT_COMPANY_STARTED";
export const UPDATE_COMPANY_STARTED =
  "project/selectedCompanyTree/UPDATE_COMPANY_STARTED";
export const UPDATE_LIMIT_STARTED =
  "project/selectedCompanyTree/UPDATE_LIMIT_STARTED";
export const RESET_COMPANY_TREE =
  "project/selectedCompanyTree/RESET_COMPANY_TREE";

const initialState = {
  selectedGroup: {
    id: undefined,
    name: "",
    params: {
      deliveryType: undefined,
    },
    ordersLimit: {
      percentage: 0,
      availableValue: 0,
      usedLimit: 0,
      totalLimit: 0,
      checkForLimit: false,
    },
  },
  selectedSubgroup: {
    id: undefined,
    name: "",
    description: "",
    value: "",
  },
  selectedCompany: {
    id: undefined,
    name: "",
    description: "",
    cnpj: "",
    value: "",
  },
};

const updateTree = (state = initialState, { payload }) => ({
  ...state,
  selectedGroup: payload.selectedGroup,
  selectedSubgroup: payload.selectedSubgroup,
  selectedCompany: payload.selectedCompany,
});

const updateGroup = (state, { payload }) => ({
  // eslint-disable-line
  ...initialState,
  selectedGroup: {
    ...state.selectedGroup,
    ...payload.selectedGroup,
  },
});

const updateParentCompany = (state = initialState, { payload }) => ({
  ...state,
  selectedSubgroup: payload.selectedSubgroup,
  selectedCompany: initialState.selectedCompany,
});

const updateCompany = (state = initialState, { payload }) => ({
  ...state,
  selectedCompany: payload.selectedCompany,
});

const updateLimit = (state = initialState, { payload }) => ({
  ...state,
  selectedGroup: {
    ...state.selectedGroup,
    ordersLimit: payload.ordersLimit,
  },
});

const resetTree = () => ({
  ...initialState,
});

const handlers = {
  [UPDATE_TREE_STARTED]: updateTree,
  [UPDATE_GROUP_STARTED]: updateGroup,
  [UPDATE_PARENT_COMPANY_STARTED]: updateParentCompany,
  [UPDATE_COMPANY_STARTED]: updateCompany,
  [UPDATE_LIMIT_STARTED]: updateLimit,
  [RESET_COMPANY_TREE]: resetTree,
};

export default createReducer(initialState, handlers);
