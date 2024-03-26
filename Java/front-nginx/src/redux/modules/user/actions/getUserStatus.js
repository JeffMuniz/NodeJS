import {
  getUserStatus,
  getUserStatusTerm,
  postUserStatusTerm,
} from "src/api/user/userStatus";
import { simpleAction } from "@utils";
import ResponseError from "src/common/entities/ResponseError";

import { userInfoFromApi } from "src/api/dtos/userInfo.dto";

import { USER_STATUS_COMPLETED } from "src/redux/modules/user/reducer/userReducer";

export const GET_USER_STATUS_STARTED = "GET_USER_STATUS_STARTED";
export const GET_USER_STATUS_COMPLETED = "GET_USER_STATUS_COMPLETED";
export const GET_USER_STATUS_FAILED = "GET_USER_STATUS_FAILED";

export const GET_USER_STATUS_TERM_STARTED = "GET_USER_STATUS_TERM_STARTED";
export const GET_USER_STATUS_TERM_COMPLETED = "GET_USER_STATUS_TERM_COMPLETED";
export const GET_USER_STATUS_TERM_FAILED = "GET_USER_STATUS_TERM_FAILED";

export const POST_USER_STATUS_TERM_STARTED = "POST_USER_STATUS_TERM_STARTED";
export const POST_USER_STATUS_TERM_COMPLETED =
  "POST_USER_STATUS_TERM_COMPLETED";
export const POST_USER_STATUS_TERM_FAILED = "POST_USER_STATUS_TERM_FAILED";

export const getUserStatusInfo = (token, cpf) => async dispatch => {
  dispatch(simpleAction(GET_USER_STATUS_STARTED)());
  try {
    const result = await getUserStatus({
      token,
      cpf,
    });

    dispatch(simpleAction(GET_USER_STATUS_COMPLETED));

    return userInfoFromApi(result);
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(simpleAction(GET_USER_STATUS_FAILED)(error));

    throw errorWithMessage;
  }
};

export const getUserStatusTermInfo = (
  cpf,
  serviceChannelId,
  status,
  anonimizado,
  birthDate,
  phone,
  mother,
) => async dispatch => {
  dispatch(simpleAction(GET_USER_STATUS_TERM_STARTED));
  try {
    const data = await getUserStatusTerm({
      cpf,
      serviceChannelId,
    });

    const acceptedTerm = data ? data.aceite : false;

    const isValidLogin =
      !anonimizado &&
      status === "ATIVO" &&
      !!acceptedTerm &&
      !!birthDate &&
      !!phone &&
      !!mother;

    dispatch({
      type: USER_STATUS_COMPLETED,
      isValidLogin,
    });

    dispatch(simpleAction(GET_USER_STATUS_TERM_COMPLETED));

    return data;
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(simpleAction(GET_USER_STATUS_TERM_FAILED)(error));

    throw errorWithMessage;
  }
};

export const postUserStatusTermInfo = (
  cpf,
  serviceChannelId,
  status,
  anonimizado,
  birthDate,
  phone,
  mother,
  isFirstAccess = false,
) => async dispatch => {
  dispatch(simpleAction(POST_USER_STATUS_TERM_STARTED));
  try {
    await postUserStatusTerm({
      cpf,
      serviceChannelId,
    });

    // o acceptedTerm não é necessário nesse momento porque
    // só chegará aqui se o post for executado com sucesso
    const isValidLogin =
      !anonimizado &&
      status === "ATIVO" &&
      // acceptedTerm &&
      birthDate &&
      phone &&
      mother &&
      !isFirstAccess;

    dispatch({
      type: USER_STATUS_COMPLETED,
      isValidLogin,
    });

    dispatch(simpleAction(POST_USER_STATUS_TERM_COMPLETED));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(simpleAction(POST_USER_STATUS_TERM_FAILED)(error));

    throw errorWithMessage;
  }
};
