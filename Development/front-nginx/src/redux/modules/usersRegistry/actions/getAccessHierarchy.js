import api from "src/api/accessHierarchy/get";
import { simpleAction, toOnlyNumbers } from "@utils";
import AccessHierarchyDTO from "src/api/dtos/accessHierarchy.dto";

export const SET_SELECTED_USER_STARTED = "SET_SELECTED_USER_STARTED";
export const SET_SELECTED_USER_COMPLETED = "SET_SELECTED_USER_COMPLETED";
export const SET_SELECTED_USER_FAILED = "SET_SELECTED_USER_FAILED";

export const getAccessHierarchy = ({
  cpf,
  idGroup,
  idLoggedUser,
}) => async dispatch => {
  dispatch(simpleAction(SET_SELECTED_USER_STARTED)());

  try {
    const { data: accessHierarchy } = await api({
      cpf,
      idGroup,
      idLoggedUser,
    });

    const hierarchy = AccessHierarchyDTO.fromApi(accessHierarchy);

    dispatch({ type: SET_SELECTED_USER_COMPLETED, payload: hierarchy });

    return hierarchy;
  } catch (error) {
    const { status } = error;

    if (status === 404) {
      const hierarchy = AccessHierarchyDTO.fromApi({ cpf: toOnlyNumbers(cpf) });

      dispatch({ type: SET_SELECTED_USER_COMPLETED, payload: hierarchy });

      return hierarchy;
    }

    dispatch(simpleAction(SET_SELECTED_USER_FAILED)(error));

    throw error;
  }
};
