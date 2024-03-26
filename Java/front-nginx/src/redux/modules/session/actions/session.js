import isEmpty from "lodash/isEmpty";
import { Krypton, simpleAction } from "@utils";

// APIs
import * as sessionApi from "src/api/session/session";
import * as codeApi from "src/api/code/code";
import ResponseError from "src/common/entities/ResponseError";
import UserDto from "src/api/dtos/user.dto";
import { getTimestamp } from "src/api/session/session";

// Actions
import { RESET_STATE } from "src/redux/configureStore";
import { USER_COMPLETED } from "src/redux/modules/user/reducer/userReducer";
import {
  SESSION_COMPLETED,
  SESSION_STARTED,
  SESSION_FAILED,
} from "../reducer/sessionReducer";

const sessionCompleted = simpleAction(SESSION_COMPLETED);
const sessionLoading = simpleAction(SESSION_STARTED)();
const sessionFailed = simpleAction(SESSION_FAILED);

const errorsMessage = {
  404: "Seu CPF e/ou senha não foram identificados.\nVerifique se eles foram preenchidos corretamente.",
  401: "Seu CPF e/ou senha não foram identificados.\nVerifique se eles foram preenchidos corretamente.",
};

export const signIn = (payload, injection) => async dispatch => {
  const dependencies = {
    api: sessionApi,
    Krypton,
    ...injection,
  };

  dispatch(sessionLoading);

  // Request pegando o timestamp do servidor
  const objTimestamp = await getTimestamp();
  // const { timestamp } = objTimestamp.data;
  // pegando o timestamp da maquina
  const timestampLocal = new Date().getTime();
  // transformando o timestamp(number) em  string fatiando a string e pegando os 10 primeiros digitos
  const stringTimestampRequest = String(objTimestamp.data.timestamp).substring(
    0,
    9,
  );
  const stringTimestampLocal = String(timestampLocal).substring(0, 9);
  // comparando os 10 primeiros digitos, onde ele sendo igual, o horario da maquina está atualizado
  const validatedTimestamp = stringTimestampRequest === stringTimestampLocal;

  if (validatedTimestamp) {
    try {
      const { data: result } = await dependencies.api.signIn(payload);
      const { accessToken, publicKey, usuario: userData, timestamp } = result;
      const userParsed = { ...UserDto.fromApi(userData) };

      dispatch({
        type: USER_COMPLETED,
        payload: userParsed,
      });

      dispatch(
        sessionCompleted({
          accessToken,
          publicKey,
          timestamp,
          validatedTimestamp,
        }),
      );
    } catch (error) {
      const errorWithMessage = new ResponseError(
        error,
        errorsMessage[error.status],
      ).getError();

      dispatch(sessionFailed(errorWithMessage));

      throw errorWithMessage;
    }
  } else {
    try {
      const { data: result } = await dependencies.api.signIn(payload);
      const { accessToken, publicKey, usuario: userData, timestamp } = result;
      const userParsed = { ...UserDto.fromApi(userData) };
      dispatch({
        type: USER_COMPLETED,
        payload: userParsed,
      });

      dispatch(
        sessionCompleted({
          accessToken,
          publicKey,
          timestamp,
          validatedTimestamp,
        }),
      );
    } catch (error) {
      const errorWithMessage = new ResponseError(
        error,
        errorsMessage[error.status],
      ).getError();

      dispatch(sessionFailed(errorWithMessage));

      throw errorWithMessage;
    }
  }
};

export const getCode = injection => async dispatch => {
  const dependencies = { api: codeApi, ...injection };
  dispatch(sessionLoading);
  try {
    const { data: codeResult } = await dependencies.api.getCode();

    if (isEmpty(codeResult)) {
      const errorWithMessage = new ResponseError().getError();
      dispatch(sessionFailed(errorWithMessage));
      throw errorWithMessage;
    }
    const { data: result } = await dependencies.api.validateCode(codeResult);

    const { accessToken, publicKey, timestamp } = result;

    return dispatch(
      sessionCompleted({
        accessToken,
        publicKey,
        timestamp,
      }),
    );
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();
    dispatch(sessionFailed(errorWithMessage));
    throw errorWithMessage;
  }
};

export const resetAuth = () => dispatch => dispatch({ type: RESET_STATE });
