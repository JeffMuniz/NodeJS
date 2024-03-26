import { fromApi } from "src/api/dtos/incomeReports.dto";
import api from "src/api/finance";
import store from "src/redux/configureStore";
import {
  FIND_ALL_INCOME_REPORTS_STARTED,
  FIND_ALL_INCOME_REPORTS_FAILED,
  FIND_ALL_INCOME_REPORTS_COMPLETED,
} from "../reducer/financesReducer";

const getCredentials = () => {
  const {
    user: {
      profile: {
        data: { id: userId },
      },
    },
    selectedCompanyTree: {
      selectedGroup: { id: groupId },
    },
  } = store.getState();

  return [userId, groupId];
};

const findAllReports = ({
  year,
  cnpj,
  numberPage,
  sizePage,
}) => async dispatch => {
  let result = {};

  dispatch({ type: FIND_ALL_INCOME_REPORTS_STARTED });

  const [idUsuario, idGrupoEmpresa] = getCredentials();

  try {
    const { data } = await api.findAllReports({
      year,
      cnpj,
      idGrupoEmpresa,
      idUsuario,
      numberPage,
      sizePage,
    });

    result = fromApi(data);

    dispatch({ type: FIND_ALL_INCOME_REPORTS_COMPLETED, payload: result });
  } catch (e) {
    dispatch({ type: FIND_ALL_INCOME_REPORTS_FAILED, payload: e });
  }

  return result;
};

export default {
  findAllReports,
};
