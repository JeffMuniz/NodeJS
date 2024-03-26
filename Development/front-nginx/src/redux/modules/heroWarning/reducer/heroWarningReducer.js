import { createReducer } from "reduxsauce";

export const SHOW_WARNING = "project/warning/SHOW_WARNING";
export const HIDE_WARNING = "project/warning/HIDE_WARNING";

const initialState = {
  showMe: false,
};

const showWarning = (state = initialState, { payload }) => ({
  ...state,
  ...payload,
  showMe: true,
});

const hideWarning = () => initialState;

const handlers = {
  [SHOW_WARNING]: showWarning,
  [HIDE_WARNING]: hideWarning,
};

export default createReducer(initialState, handlers);
