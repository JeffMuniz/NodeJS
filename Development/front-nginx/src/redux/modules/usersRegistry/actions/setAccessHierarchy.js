import api from "src/api/accessHierarchy/set";
import { simpleAction } from "@utils";
import ResponseError from "src/common/entities/ResponseError";

export const SET_ACCESS_HIERARCHY_STARTED = "SET_ACCESS_HIERARCHY_STARTED";
export const SET_ACCESS_HIERARCHY_COMPLETED = "SET_ACCESS_HIERARCHY_COMPLETED";
export const SET_ACCESS_HIERARCHY_FAILED = "SET_ACCESS_HIERARCHY_FAILED";

export const setAccessHierarchy = ({
  idsAccessLevel,
  accessLevel,
  alreadyAllowed,
  selectedUser,
  idSessionUser,
  idGroup,
}) => async dispatch => {
  dispatch(simpleAction(SET_ACCESS_HIERARCHY_STARTED));
  try {
    await api({
      idsAccessLevel,
      accessLevel,
      alreadyAllowed,
      selectedUser,
      idSessionUser,
      idGroup,
    });

    dispatch(simpleAction(SET_ACCESS_HIERARCHY_COMPLETED));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(simpleAction(SET_ACCESS_HIERARCHY_FAILED)(error));

    throw errorWithMessage;
  }
};
