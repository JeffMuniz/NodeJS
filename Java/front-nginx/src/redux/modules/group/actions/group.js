import * as groupApi from "src/api/group/group";
import ResponseError from "src/common/entities/ResponseError";
import groupDto from "src/api/dtos/group.dto";
import { simpleAction } from "@utils";

import {
  GROUP_STARTED,
  GROUP_COMPLETED,
  GROUP_FAILED,
} from "../reducer/groupReducer";

export const setIsLoading = simpleAction(GROUP_STARTED)(null);
export const setComplete = simpleAction(GROUP_COMPLETED);
export const setError = simpleAction(GROUP_FAILED);

export const getGroups = userId => async dispatch => {
  dispatch(setIsLoading);

  try {
    const result = await groupApi.getGroups(userId);

    const companies =
      result.data && result.data.content
        ? result.data.content.map(item => groupDto.fromApi(item))
        : [];

    dispatch(setComplete(companies));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(setError(errorWithMessage));
  }
};
