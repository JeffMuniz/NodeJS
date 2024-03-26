import { simpleAction } from "@utils";
import * as passwordApi from "src/api/user/password";
import ResponseError from "src/common/entities/ResponseError";

import {
  CREATE_PASSWORD_START,
  CREATE_PASSWORD_COMPLETED,
  CREATE_PASSWORD_FAILED,
} from "../reducer/userReducer";

const setIsLoading = simpleAction(CREATE_PASSWORD_START)(null);
const setError = simpleAction(CREATE_PASSWORD_FAILED);
const setComplete = simpleAction(CREATE_PASSWORD_COMPLETED)();

export const createPassword = (
  token = "1",
  newPassword,
  injection,
) => async dispatch => {
  const dependencies = { api: passwordApi, ...injection };
  dispatch(setIsLoading);
  try {
    await dependencies.api.createPassword(token, newPassword);

    dispatch(setComplete);
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(setError(errorWithMessage));
  }
};
