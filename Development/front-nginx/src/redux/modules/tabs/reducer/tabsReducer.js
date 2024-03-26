import { createReducer } from "reduxsauce";

export const SET_TAB_COMPLETED = "project/finances/SET_TAB_COMPLETED";

const initialState = {
  selectedTab: null,
};

const setSelectedTab = (state = initialState, { payload }) => ({
  ...state,
  selectedTab: payload,
});

const handlers = {
  [SET_TAB_COMPLETED]: setSelectedTab,
};

export default createReducer(initialState, handlers);
