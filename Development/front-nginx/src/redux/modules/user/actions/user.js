import { simpleAction } from "@utils";
import { USER_RESET } from "../reducer/userReducer";

const resetUserAction = simpleAction(USER_RESET)();

export const resetUser = () => dispatch => dispatch(resetUserAction);
