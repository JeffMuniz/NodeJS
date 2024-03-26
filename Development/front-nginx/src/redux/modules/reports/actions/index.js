import { fromApi, toApiDelete, toApiCreate } from "src/api/dtos/reports.dto";
import api from "src/api/reports";
import store from "src/redux/configureStore";
import {
  CREATE_REPORT_STARTED,
  CREATE_REPORT_FAILED,
  CREATE_REPORT_COMPLETED,
  FIND_ALL_REPORTS_STARTED,
  FIND_ALL_REPORTS_FAILED,
  FIND_ALL_REPORTS_COMPLETED,
  DOWNLOAD_ONE_REPORT_COMPLETED,
  DOWNLOAD_ONE_REPORT_STARTED,
  DOWNLOAD_ONE_REPORT_FAILED,
  DELETE_SELECTED_REPORTS_STARTED,
  DELETE_SELECTED_REPORTS_COMPLETED,
  DELETE_SELECTED_REPORTS_FAILED,
} from "../reducer";

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

const createReport = ({ startDate, endDate }) => async dispatch => {
  dispatch({ type: CREATE_REPORT_STARTED });

  const [userId, groupId] = getCredentials();

  try {
    const entity = toApiCreate({
      userId,
      groupId,
      startDate,
      endDate,
    });
    const { data } = await api.createReport(entity);

    const result = fromApi(data);

    dispatch({ type: CREATE_REPORT_COMPLETED, payload: result });
    return result;
  } catch (e) {
    dispatch({ type: CREATE_REPORT_FAILED, payload: e });
    throw e;
  }
};

const findAllReports = ({
  dataFim,
  dataInicio,
  numberPage,
  sizePage,
}) => async dispatch => {
  let result = {};

  dispatch({ type: FIND_ALL_REPORTS_STARTED });

  const [idUsuario, idGrupoEmpresa] = getCredentials();

  try {
    const { data } = await api.findAllReports({
      idGrupoEmpresa,
      idUsuario,
      dataFim,
      dataInicio,
      numberPage,
      sizePage,
    });

    result = fromApi(data);

    dispatch({ type: FIND_ALL_REPORTS_COMPLETED, payload: result });
  } catch (e) {
    dispatch({ type: FIND_ALL_REPORTS_FAILED, payload: e });
  }

  return result;
};

const deleteSelectedReports = payload => async dispatch => {
  dispatch({ type: DELETE_SELECTED_REPORTS_STARTED });

  const [userId, groupId] = getCredentials();

  try {
    await api.deleteReport(toApiDelete({ userId, groupId, ids: payload }));
    dispatch({ type: DELETE_SELECTED_REPORTS_COMPLETED });
  } catch (e) {
    dispatch({ type: DELETE_SELECTED_REPORTS_FAILED });
  }
};

const downloadOneReport = payload => async dispatch => {
  dispatch({ type: DOWNLOAD_ONE_REPORT_STARTED });

  const [idUsuario, idGrupoEmpresa] = getCredentials();

  try {
    const { data } = await api.downloadOneReport({
      idGrupoEmpresa,
      idUsuario,
      id: payload,
    });

    dispatch({ type: DOWNLOAD_ONE_REPORT_COMPLETED, payload: data });

    return data;
  } catch (e) {
    dispatch({ type: DOWNLOAD_ONE_REPORT_FAILED });
  }
};

export default {
  createReport,
  findAllReports,
  deleteSelectedReports,
  downloadOneReport,
};
