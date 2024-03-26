import {
  fromApi,
  companyBalanceFromApi,
  groupBalanceFromApi,
} from "src/api/dtos/virtualAccountStatement.dto";
import {
  getStatement,
  getGroupBalance,
  getCompanyBalance,
} from "src/api/chargeBack/virtualAccount";
import store from "src/redux/configureStore";
import {
  GET_VIRTUAL_ACCOUNT_STATEMENT_STARTED,
  GET_VIRTUAL_ACCOUNT_STATEMENT_FAILED,
  GET_VIRTUAL_ACCOUNT_STATEMENT_COMPLETED,
  GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_STARTED,
  GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_COMPLETED,
  GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_FAILED,
  GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_STARTED,
  GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_COMPLETED,
  GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_FAILED,
} from "../reducer/virtualAccount";

const getCredentials = () => {
  const {
    user: {
      profile: {
        data: { id: userId },
      },
    },
    selectedCompanyTree: {
      selectedCompany: { id: companyId },
      selectedGroup: { id: groupId },
    },
  } = store.getState();

  return [userId, groupId, companyId];
};

export const getVirtualAccountStatement = ({
  numberPage,
  sizePage,
}) => async dispatch => {
  let result = {};
  dispatch({ type: GET_VIRTUAL_ACCOUNT_STATEMENT_STARTED });

  const [idUsuario, idGrupoEmpresa, idEmpresa] = getCredentials();

  try {
    const { data } = await getStatement({
      idGrupoEmpresa,
      idEmpresa,
      idUsuario,
      numberPage,
      sizePage,
    });

    result = fromApi(data);

    dispatch({
      type: GET_VIRTUAL_ACCOUNT_STATEMENT_COMPLETED,
      payload: result,
    });
  } catch (e) {
    dispatch({ type: GET_VIRTUAL_ACCOUNT_STATEMENT_FAILED, payload: e });
  }

  return result;
};

export const getVirtualAccountGroupBalance = () => async dispatch => {
  let result = {};
  dispatch({ type: GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_STARTED });

  const [idUsuario, idGrupoEmpresa] = getCredentials();

  try {
    const { data } = await getGroupBalance({
      idGrupoEmpresa,
      idUsuario,
    });

    result = groupBalanceFromApi(data);

    dispatch({
      type: GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_COMPLETED,
      payload: result,
    });
  } catch (e) {
    dispatch({ type: GET_VIRTUAL_ACCOUNT_GROUP_BALANCE_FAILED, payload: e });
  }

  return result;
};

export const getVirtualAccountCompanyBalance = companyId => async dispatch => {
  let result = {};
  dispatch({ type: GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_STARTED });

  const [idUsuario, idGrupoEmpresa, idEmpresa] = getCredentials();

  if (companyId === undefined || companyId === null) {
    return result;
  }
  try {
    const { data } = await getCompanyBalance({
      idGrupoEmpresa,
      idEmpresa: companyId || idEmpresa,
      idUsuario,
    });

    result = companyBalanceFromApi(data);

    dispatch({
      type: GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_COMPLETED,
      payload: result,
    });
  } catch (e) {
    dispatch({ type: GET_VIRTUAL_ACCOUNT_COMPANY_BALANCE_FAILED, payload: e });
  }

  return result;
};
