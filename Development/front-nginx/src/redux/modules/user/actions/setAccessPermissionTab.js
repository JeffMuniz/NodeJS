import { simpleAction } from "@utils";
import { ACCESS_PERMISSION_ACTIVE_TAB } from "../reducer/userReducer";

const setActiveTab = simpleAction(ACCESS_PERMISSION_ACTIVE_TAB);

export const setAccessPermissionActiveTab = payload => dispatch =>
  dispatch(setActiveTab(payload));
