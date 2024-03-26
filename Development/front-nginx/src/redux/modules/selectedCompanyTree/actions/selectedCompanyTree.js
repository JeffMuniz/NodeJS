import { simpleAction } from "@utils";
import { getGroupParams, getOrdersLimit } from "src/api/group/group";
import { paramsFromApi, ordersLimitFromApi } from "src/api/dtos/group.dto";

import { RESET_SUBGROUP_STATE } from "src/redux/modules/subgroup/reducer/subgroupReducer";
import { RESET_COMPANIES_STATE } from "src/redux/modules/companies/reducer/companiesReducer";
import {
  UPDATE_TREE_STARTED,
  UPDATE_GROUP_STARTED,
  UPDATE_PARENT_COMPANY_STARTED,
  UPDATE_COMPANY_STARTED,
  UPDATE_LIMIT_STARTED,
  RESET_COMPANY_TREE,
} from "../reducer/selectedCompanyTreeReducer";

const updateCompanyTree = simpleAction(UPDATE_TREE_STARTED);
const updateGroup = simpleAction(UPDATE_GROUP_STARTED);
const updateParentCompany = simpleAction(UPDATE_PARENT_COMPANY_STARTED);
const updateCompany = simpleAction(UPDATE_COMPANY_STARTED);
const updateLimit = simpleAction(UPDATE_LIMIT_STARTED);
const resetCompanyTreeAction = simpleAction(RESET_COMPANY_TREE)();
const resetSubgroupState = simpleAction(RESET_SUBGROUP_STATE)();
const resetCompaniesState = simpleAction(RESET_COMPANIES_STATE)();

export const updateSelectedCompanyTree = params => dispatch =>
  dispatch(updateCompanyTree(params));

export const updateSelectedGroup = params => dispatch => {
  dispatch(resetCompanyTreeAction);
  dispatch(resetSubgroupState);
  dispatch(resetCompaniesState);
  dispatch(updateGroup(params));
};

export const updateSelectedGroupParams = ({ idGroup, idUser }) => async () => {
  try {
    const result = await getGroupParams({ idGroup, idUser });

    return paramsFromApi(result);
  } catch (error) {
    throw error;
  }
};

export const getSelectedGroupOrdersLimit = ({
  idGroup,
  userId,
}) => async dispatch => {
  try {
    const result = await getOrdersLimit({ idGroup, userId });
    dispatch(updateLimit(ordersLimitFromApi(result)));
    return ordersLimitFromApi(result);
  } catch (error) {
    throw error;
  }
};

export const updateSelectedSubgroup = params => dispatch =>
  dispatch(updateParentCompany(params));

export const updateSelectedCompany = params => dispatch =>
  dispatch(updateCompany(params));

export const resetCompanyTree = () => dispatch =>
  dispatch(resetCompanyTreeAction);
