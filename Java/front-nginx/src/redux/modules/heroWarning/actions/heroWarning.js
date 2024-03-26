import { simpleAction } from "@utils";
import { SHOW_WARNING, HIDE_WARNING } from "../reducer/heroWarningReducer";

const showWarningAction = simpleAction(SHOW_WARNING);
const hideWarningAction = simpleAction(HIDE_WARNING)();

export const showWarning = props => dispatch =>
  dispatch(showWarningAction(props));

export const hideWarning = () => dispatch => dispatch(hideWarningAction);
