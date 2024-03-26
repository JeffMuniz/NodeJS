import api from "src/api/accessHierarchy/get";
import { simpleAction } from "@utils";
import { isEmpty, isObject } from "lodash";
import AccessHierarchyDTO from "src/api/dtos/accessHierarchy.dto";
import {
  GET_USER_ACCESS_LEVEL_STARTED,
  GET_USER_ACCESS_LEVEL_COMPLETED,
  GET_USER_ACCESS_LEVEL_FAILED,
} from "src/redux/modules/user/reducer/userReducer";
import { userAccessLevel } from "@enums";

const mapAccessLevel = ({ permission } = {}) => {
  if (!isObject(permission) || isEmpty(permission)) return "";

  const {
    group: { subgroups },
  } = permission;

  if (isEmpty(subgroups)) return userAccessLevel.GROUP;
  let accessLevel = "";

  subgroups.forEach(subgroup => {
    const { companies } = subgroup;
    const level = isEmpty(companies)
      ? userAccessLevel.SUBGROUP
      : userAccessLevel.COMPANY;

    if (!accessLevel || accessLevel === level) {
      accessLevel = level;
    } else {
      accessLevel = userAccessLevel.HYBRID;
    }
  });

  return accessLevel;
};

export const getUserAccessLevel = ({
  cpf,
  idGroup,
  idLoggedUser,
}) => async dispatch => {
  dispatch(simpleAction(GET_USER_ACCESS_LEVEL_STARTED)());
  try {
    const { data: accessHierarchy } = await api({
      cpf,
      idGroup,
      idLoggedUser,
    });

    const hierarchy = AccessHierarchyDTO.fromApi(accessHierarchy);
    const payload = mapAccessLevel(hierarchy);

    dispatch({ type: GET_USER_ACCESS_LEVEL_COMPLETED, payload });
  } catch (error) {
    dispatch(simpleAction(GET_USER_ACCESS_LEVEL_FAILED)(error));

    throw error;
  }
};
