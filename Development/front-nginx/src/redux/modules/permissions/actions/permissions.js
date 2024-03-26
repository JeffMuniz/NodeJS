import { simpleAction } from "@utils";
import ResponseError from "src/common/entities/ResponseError";
import * as permissionApi from "src/api/user/permission";
import {
  GET_AUTHORIZED_USERS_STARTED,
  GET_AUTHORIZED_USERS_COMPLETED,
  GET_AUTHORIZED_USERS_FAILED,
} from "../reducer/permissionsReducer";

const authorizedStarted = simpleAction(GET_AUTHORIZED_USERS_STARTED)();
const authorizedCompleted = simpleAction(GET_AUTHORIZED_USERS_COMPLETED);
const authorizedFailed = simpleAction(GET_AUTHORIZED_USERS_FAILED);

export const getAuthorizedUsers = ({
  page,
  size,
  orderBy,
  idCompanyGroup,
  idCompanySubGroup,
  cpf,
  name,
  status,
}) => async dispatch => {
  dispatch(authorizedStarted);

  try {
    const authorizedUsers = await permissionApi.getUserPermissions({
      page,
      size,
      orderBy,
      idCompanyGroup,
      idCompanySubGroup,
      cpf,
      name,
      status,
    });

    dispatch(authorizedCompleted(authorizedUsers));

    return authorizedUsers;
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(authorizedFailed(errorWithMessage));
  }
};
