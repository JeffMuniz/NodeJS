import { simpleAction } from "@utils";
import { getGroupAndUserIdFromState } from "src/utils/session";

import {
  FindHeader,
  FindDetails,
  NewChargeBack,
  EmployeeSearch,
} from "src/api/chargeBack/chargeBack";
import { RequestToApi, SearchtoApi } from "src/api/dtos/chargeBack.dto";

import {
  REQUEST_HEADER_CHARGEBACK_DETAILS,
  REQUEST_DETAILS_CHARGEBACK_DETAILS,
  CHARGEBACK_REQUEST_STARTED,
  CHARGEBACK_REQUEST_COMPLETED,
  CHARGEBACK_REQUEST_FAILED,
  CHARGEBACK_EMPLOYEE_STARTED,
  CHARGEBACK_EMPLOYEE_COMPLETED,
  CHARGEBACK_EMPLOYEE_FAILED,
} from "../reducer/ChargeBackSelected";

const chargeBackCompanyStarted = simpleAction(CHARGEBACK_REQUEST_STARTED)();
const chargeBackCompanyCompleted = simpleAction(CHARGEBACK_REQUEST_COMPLETED);
const chargeBackCompanyFailed = simpleAction(CHARGEBACK_REQUEST_FAILED);
const chargeBackEmployeeStarted = simpleAction(CHARGEBACK_EMPLOYEE_STARTED)();
const chargeBackEmployeeCompleted = simpleAction(CHARGEBACK_EMPLOYEE_COMPLETED);
const chargeBackEmployeeFailed = simpleAction(CHARGEBACK_EMPLOYEE_FAILED);

export const fetchChargeBackHeader = (value = {}) => async dispatch => {
  try {
    const { data } = await FindHeader({
      id_chargeBack: value,
    });
    dispatch({ type: REQUEST_HEADER_CHARGEBACK_DETAILS, payload: data });
  } catch (e) {
    // dispatch erro
  }
};

export const fetchChargeBackDetails = (value = {}) => async dispatch => {
  try {
    const { data } = await FindDetails({
      id_chargeBack: value,
    });

    dispatch({ type: REQUEST_DETAILS_CHARGEBACK_DETAILS, payload: data });
  } catch (e) {
    // console.warn(e);
  }
};

export const chargeBackCompanyRequest = (
  employees,
  company,
) => async dispatch => {
  dispatch(chargeBackCompanyStarted);

  try {
    /* eslint-disable camelcase */
    const {
      userId: id_usuario,
      userName: nome_usuario,
    } = getGroupAndUserIdFromState();

    /* eslint-disable camelcase */
    const body = RequestToApi(employees, company, { id_usuario, nome_usuario });

    const { data } = await NewChargeBack(body);

    dispatch(chargeBackCompanyCompleted(data));
  } catch (error) {
    dispatch(chargeBackCompanyFailed(error));
  }
};

export const employeeSearchRequest = (
  idGroup,
  idCompany,
  idEmployee,
  cpfs,
) => async dispatch => {
  dispatch(chargeBackEmployeeStarted);
  try {
    const body = SearchtoApi(idGroup, idCompany, idEmployee, cpfs);

    const { data } = await EmployeeSearch(body);

    dispatch(chargeBackEmployeeCompleted(data));
  } catch (error) {
    dispatch(chargeBackEmployeeFailed([]));
  }
};
