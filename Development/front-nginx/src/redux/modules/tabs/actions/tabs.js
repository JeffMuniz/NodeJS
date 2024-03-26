import { simpleAction } from "@utils";

import { SET_TAB_COMPLETED } from "../reducer/tabsReducer";

const setTab = simpleAction(SET_TAB_COMPLETED);

export const setSelectedTab = tab => dispatch => {
  dispatch(setTab(tab));
};

export const clearTab = () => dispatch => dispatch(setTab(null));
