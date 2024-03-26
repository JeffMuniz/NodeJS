import { simpleAction } from "@utils";

export const SET_SELECTED_MATRIX = "SET_SELECTED_MATRIX";

export const setSelectedSubgroup = ({ idMatrix }) => dispatch =>
  dispatch(simpleAction(SET_SELECTED_MATRIX)({ idMatrix }));
