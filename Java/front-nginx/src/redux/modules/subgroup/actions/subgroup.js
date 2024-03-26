import * as subgroupApi from "src/api/group/group";

import ResponseError from "src/common/entities/ResponseError";
import subgroupDTO from "src/api/dtos/subgroup.dto";

import { errorMessages as errorMessagesEnum } from "@enums";
import { simpleAction } from "@utils";

import {
  GET_SUBGROUP_STARTED,
  GET_SUBGROUP_COMPLETED,
  GET_SUBGROUP_FAILED,
  GET_SUBGROUP_TREE_STARTED,
  GET_SUBGROUP_TREE_COMPLETED,
  GET_SUBGROUP_TREE_FAILED,
} from "../reducer/subgroupReducer";

const subgroupLoading = simpleAction(GET_SUBGROUP_STARTED)();
const subgroupCompleted = simpleAction(GET_SUBGROUP_COMPLETED);
const subgroupFailed = simpleAction(GET_SUBGROUP_FAILED);

export const getSubgroups = (
  { idGroup, page = 0, size = 10 },
  injection,
) => async (dispatch, getState) => {
  await dispatch(subgroupLoading);

  const dependencies = { api: subgroupApi, ...injection };

  try {
    const {
      user: {
        profile: {
          data: { id: idUser },
        },
      },
    } = getState();

    const {
      data: {
        content = [],
        totalElements: totalItems,
        nextPage,
        hasContent,
      } = {},
    } = await dependencies.api.getSubgroups({
      idGroup,
      page,
      size,
      idUser,
    });

    if (!hasContent)
      return dispatch(
        subgroupCompleted({
          totalItems: 0,
          nextPage: 0,
          subgroups: [],
        }),
      );

    const subgroups = content.map(item => subgroupDTO.fromApi(item));

    return dispatch(
      subgroupCompleted({
        totalItems,
        nextPage,
        subgroups,
      }),
    );
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    return dispatch(subgroupFailed(errorWithMessage));
  }
};

export const getSubgroupsList = ({ idGroup, page = 0 }, injection) => async (
  dispatch,
  getState,
) => {
  await dispatch(subgroupLoading);

  const dependencies = { api: subgroupApi, ...injection };

  try {
    const {
      user: {
        profile: {
          data: { id: idUser },
        },
      },
    } = getState();

    const {
      data: {
        content = [],
        totalElements: totalItems,
        nextPage,
        hasContent,
      } = {},
    } = await dependencies.api.getSubgroups({
      idGroup,
      page,
      size: 100,
      idUser,
    });

    if (!hasContent)
      return dispatch(
        subgroupCompleted({
          totalItems: 0,
          nextPage: 0,
          subgroups: [],
        }),
      );

    const subgroups = content.map(item => subgroupDTO.fromApi(item));

    return dispatch(
      subgroupCompleted({
        totalItems,
        nextPage,
        subgroups,
      }),
    );
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    return dispatch(subgroupFailed(errorWithMessage));
  }
};

const mapResultToSubgroups = group => {
  if (!group) {
    const error = {
      response: {
        status: 500,
        data: { message: errorMessagesEnum.DataNotFound },
      },
    };
    throw error;
  }

  const { subGrupos: subgroupsFromAPI } = group;

  return subgroupsFromAPI.map(sub => subgroupDTO.fromApi(sub));
};

export const getSubgroupsTree = (
  { idGroup, idUser },
  injection,
) => async dispatch => {
  const dependencies = { api: subgroupApi, ...injection };
  await dispatch({ type: GET_SUBGROUP_TREE_STARTED });

  try {
    const { data } = await dependencies.api.getSubgroupsTree({
      idGroup,
      idUser,
    });

    const content = mapResultToSubgroups(data);

    return dispatch({
      type: GET_SUBGROUP_TREE_COMPLETED,
      payload: {
        content,
      },
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    return dispatch({
      type: GET_SUBGROUP_TREE_FAILED,
      payload: errorWithMessage,
    });
  }
};
