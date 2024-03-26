import { simpleAction } from "@utils";
import * as passwordApi from "src/api/user/password";
import ResponseError from "src/common/entities/ResponseError";

import {
  FORGOTPASSWORD_COMPLETED,
  FORGOTPASSWORD_STARTED,
  FORGOTPASSWORD_FAILED,
  FORGOTPASSWORD_RESET,
} from "../reducer/userReducer";

const forgotPasswordCompleted = simpleAction(FORGOTPASSWORD_COMPLETED)();
const forgotPasswordStarted = simpleAction(FORGOTPASSWORD_STARTED)();
const forgotPasswordFailed = simpleAction(FORGOTPASSWORD_FAILED);
const resetForgotPasswordAction = simpleAction(FORGOTPASSWORD_RESET)();
const errorsMessage = {
  404: "Seus dados de CPF e/ou E-mail não foram identificados entre nossos usuários. Verifique se os dados acima estão corretos.",
};

export const forgotPassword = ({ cpf, email }, injection) => async dispatch => {
  const dependencies = { api: passwordApi, ...injection };
  dispatch(forgotPasswordStarted);

  try {
    await dependencies.api.forgotPassword({ cpf, email });

    dispatch(forgotPasswordCompleted);
  } catch (error) {
    const errorWithMessage = new ResponseError(
      error,
      errorsMessage[error.status],
    ).getError();

    dispatch(forgotPasswordFailed(errorWithMessage));

    throw errorWithMessage;
  }
};

export const resetForgotPassword = () => dispatch =>
  dispatch(resetForgotPasswordAction);
