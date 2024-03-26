import { setUserEdit } from "src/api/accessHierarchy/set";
import { simpleAction } from "@utils";
import ResponseError from "src/common/entities/ResponseError";

import { USER_STATUS_COMPLETED } from "src/redux/modules/user/reducer/userReducer";

export const SET_UPDATE_HIERARCHY_STARTED = "SET_UPDATE_HIERARCHY_STARTED";
export const SET_UPDATE_HIERARCHY_COMPLETED = "SET_UPDATE_HIERARCHY_COMPLETED";
export const SET_UPDATE_HIERARCHY_FAILED = "SET_UPDATE_HIERARCHY_FAILED";

export const setUpdateHierarchy = ({
  id,
  cpf,
  name,
  email,
  mother,
  birthDate,
  phone,
  idUserLogged,
  idGroupCompany,
  isValidLogin = false,
  isFirstAccess = false,
}) => async dispatch => {
  dispatch(simpleAction(SET_UPDATE_HIERARCHY_STARTED));
  try {
    await setUserEdit({
      id,
      cpf,
      name,
      email,
      mother,
      birthDate,
      phone,
      idUserLogged,
      idGroupCompany,
    });

    if (isValidLogin && !isFirstAccess) {
      dispatch({
        type: USER_STATUS_COMPLETED,
        isValidLogin,
      });
    }

    dispatch(simpleAction(SET_UPDATE_HIERARCHY_COMPLETED));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(simpleAction(SET_UPDATE_HIERARCHY_FAILED)(error));

    throw errorWithMessage;
  }
};
