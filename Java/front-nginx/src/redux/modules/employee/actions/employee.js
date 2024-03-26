import ResponseError from "src/common/entities/ResponseError";

import * as employeeApi from "src/api/employee/employee";
import * as voucherApi from "src/api/voucher/voucher";
import * as statementApi from "src/api/statement/statement";

import EmployeeDto, { toApi } from "src/api/dtos/employee.dto";
import EmployeesDto from "src/api/dtos/employees";
import ChargebacksDto from "src/api/dtos/chargebacks.dto";
import ChargebackBodyDto from "src/api/dtos/chargebackBody.dto";
import VoucherDto from "src/api/dtos/voucher.dto";
import StatementDto from "src/api/dtos/statement.dto";
import { formatDatesToRange, simpleAction } from "@utils";

import store from "src/redux/configureStore";

import {
  GET_EMPLOYEES_STARTED,
  GET_EMPLOYEES_COMPLETED,
  GET_EMPLOYEES_FAILED,
  EMPLOYEES_RESET,
  GET_EMPLOYEES_COUNT_STARTED,
  GET_EMPLOYEES_COUNT_COMPLETED,
  GET_EMPLOYEES_COUNT_FAILED,
  EMPLOYEES_COUNT_RESET,
  EMPLOYEE_REGISTRY_STARTED,
  EMPLOYEE_REGISTRY_COMPLETED,
  EMPLOYEE_REGISTRY_FAILED,
  EMPLOYEE_STATEMENTS_STARTED,
  EMPLOYEE_STATEMENTS_COMPLETED,
  EMPLOYEE_STATEMENTS_FAILED,
  EMPLOYEE_VOUCHERS_STARTED,
  EMPLOYEE_VOUCHERS_COMPLETED,
  EMPLOYEE_VOUCHERS_FAILED,
  EMPLOYEE_CHOSEN_ACCOUNT,
  EMPLOYEE_AVAILABLE_ACCOUNTS,
  GET_EMPLOYEE_CHARGEBACK_INFO_COMPLETED,
  GET_DETAILS_CHARGEBACK_INFO_STARTED,
  GET_DETAILS_CHARGEBACK_INFO_COMPLETED,
  GET_DETAILS_CHARGEBACK_INFO_FAILED,
  GET_CHARGEBACKS_STARTED,
  GET_CHARGEBACKS_COMPLETED,
  GET_CHARGEBACKS_FAILED,
  GET_DETAILS_CHARGEBACK_BODY_STARTED,
  GET_DETAILS_CHARGEBACK_BODY_COMPLETED,
  GET_DETAILS_CHARGEBACK_BODY_FAILED,
} from "../reducer/employeeReducer";

const DEFAULT_DISTANCE_DAYS = 179;

export const getEmployees = (
  { page, size = 10, companyId, orderBy, cpf, name, status },
  injection,
) => async dispatch => {
  const dependencies = { api: employeeApi, ...injection };
  dispatch({ type: GET_EMPLOYEES_STARTED });
  try {
    const { data: result } = await dependencies.api.getEmployees({
      page,
      size,
      companyId,
      orderBy,
      cpf,
      name,
      status,
    });
    const employees = result.content.map(r => EmployeesDto.fromApi(r));

    dispatch({
      type: GET_EMPLOYEES_COMPLETED,
      payload: { totalItems: result.totalElements, content: employees },
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({
      type: GET_EMPLOYEES_FAILED,
      payload: errorWithMessage,
    });
  }
};

export const getEmployeesCount = (params, injection) => async dispatch => {
  const dependencies = { api: employeeApi, ...injection };
  dispatch({ type: GET_EMPLOYEES_COUNT_STARTED });
  try {
    const {
      data: dataActives,
    } = await dependencies.api.getEmployeesCountActivesInactives(params, 1);

    const {
      data: dataInactives,
    } = await dependencies.api.getEmployeesCountActivesInactives(params, 2);

    dispatch({
      type: GET_EMPLOYEES_COUNT_COMPLETED,
      payload: {
        totalEmployees: dataActives + dataInactives || 0,
        activeEmployees: dataActives || 0,
        inactiveEmployees: dataInactives || 0,
      },
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({
      type: GET_EMPLOYEES_COUNT_FAILED,
      payload: errorWithMessage,
    });
  }
};

function GetEmployeeRegistryException(message, status) {
  this.name = "UserException";
  this.data = {
    message,
    code: status,
    type: "",
  };
}

export const getEmployeeRegistry = (
  { cpf, companyId, employeeStatus },
  injection,
) => async dispatch => {
  const dependencies = { api: employeeApi, ...injection };
  dispatch({ type: EMPLOYEE_REGISTRY_STARTED });

  try {
    const { data, status } = await dependencies.api.getEmployee({
      cpf,
      companyId,
      employeeStatus,
    });

    if (status > 200) {
      throw new GetEmployeeRegistryException("CPF not found", status);
    }

    const payload = EmployeeDto.fromApi(data.content[0]);

    dispatch({
      type: EMPLOYEE_REGISTRY_COMPLETED,
      payload,
    });

    return payload;
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({ type: EMPLOYEE_REGISTRY_FAILED, error: errorWithMessage });

    throw errorWithMessage;
  }
};

export const setAvailableAccounts = accounts => ({
  type: EMPLOYEE_AVAILABLE_ACCOUNTS,
  payload: accounts,
});

export const setChosenAccount = account => ({
  type: EMPLOYEE_CHOSEN_ACCOUNT,
  payload: account,
});

export const getEmployeeStatements = (
  { idAccount, startDate, endDate } = {},
  page = 0,
  injection,
) => async dispatch => {
  if (!idAccount) return null;
  const { startsAt, endsAt } = formatDatesToRange(
    startDate,
    endDate,
    DEFAULT_DISTANCE_DAYS,
  );
  const dependencies = { api: statementApi, ...injection };
  dispatch({ type: EMPLOYEE_STATEMENTS_STARTED });

  try {
    const result = await dependencies.api.getStatements(
      {
        idAccount,
        startsAt,
        endsAt,
      },
      page,
    );

    if (result.status === 204)
      return dispatch({
        type: EMPLOYEE_STATEMENTS_COMPLETED,
        payload: {},
      });

    const { data: statementFromApi = {} } = result;

    const payload = StatementDto.fromApi(statementFromApi);

    dispatch({
      type: EMPLOYEE_STATEMENTS_COMPLETED,
      payload,
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({ type: EMPLOYEE_STATEMENTS_FAILED, error: errorWithMessage });

    throw errorWithMessage;
  }
};

export const getEmployeeVouchers = (employeeCPF, cnpj) => async dispatch => {
  const dependencies = { api: voucherApi };
  dispatch({ type: EMPLOYEE_VOUCHERS_STARTED });

  try {
    const {
      data: { cartoes: vouchersFromApi },
    } = await dependencies.api.getVouchers({
      cpf: employeeCPF,
      cnpj,
    });

    const payload = [];

    const filteredVouchers = vouchersFromApi.filter(
      voucher => voucher.cnpj === cnpj,
    );
    filteredVouchers.forEach(voucher =>
      payload.push(VoucherDto.fromApi(voucher)),
    );

    dispatch({
      type: EMPLOYEE_VOUCHERS_COMPLETED,
      payload,
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({ type: EMPLOYEE_VOUCHERS_FAILED, error: errorWithMessage });

    throw errorWithMessage;
  }
};

export const resetCountAction = () => dispatch =>
  dispatch(simpleAction(EMPLOYEES_COUNT_RESET)());

export const resetEmployeesAction = () => dispatch =>
  dispatch(simpleAction(EMPLOYEES_RESET)());

export const updateEmployee = formValues => async () => {
  try {
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

    const entity = toApi({ ...formValues, userId, groupId });

    await employeeApi.updateEmployee(entity);
  } catch (e) {
    throw new ResponseError(e).getError();
  }
};

export const setChargebacksInfo = payload => ({
  type: GET_EMPLOYEE_CHARGEBACK_INFO_COMPLETED,
  payload,
});

export const setChargebackDetails = ({ params }) => async dispatch => {
  const dependencies = { api: employeeApi };
  dispatch({ type: GET_DETAILS_CHARGEBACK_INFO_STARTED });
  try {
    const { data } = await dependencies.api.setChargebackDetails(params);

    const chargebacks = ChargebacksDto.fromApi(data);

    dispatch({
      type: GET_DETAILS_CHARGEBACK_INFO_COMPLETED,
      payload: { chargebacks },
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({
      type: GET_DETAILS_CHARGEBACK_INFO_FAILED,
      payload: errorWithMessage,
    });
  }
};

export const getChargebackBody = ({ params, page, size }) => async dispatch => {
  const dependencies = { api: employeeApi };
  dispatch({ type: GET_DETAILS_CHARGEBACK_BODY_STARTED });
  try {
    const { data } = await dependencies.api.getChargebackBody({
      params,
      page,
      size,
    });

    const chargebacks = ChargebackBodyDto.fromApi(data);

    dispatch({
      type: GET_DETAILS_CHARGEBACK_BODY_COMPLETED,
      payload: chargebacks,
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({
      type: GET_DETAILS_CHARGEBACK_BODY_FAILED,
      payload: errorWithMessage,
    });
  }
};

export const getChargebacks = ({
  companyId,
  reason,
  status,
  startDate,
  endDate,
  page,
  size,
  searchString,
}) => async dispatch => {
  if (!companyId) return;
  const dependencies = { api: employeeApi };
  dispatch({ type: GET_CHARGEBACKS_STARTED });
  try {
    const { data: result } = await dependencies.api.getChargebacks({
      page,
      size,
      companyId,
      startDate,
      endDate,
      reason,
      status,
      dispatch,
      string: searchString,
    });
    const chargebacks = result.content.map(oneResult =>
      ChargebacksDto.fromApi(oneResult),
    );
    dispatch({
      type: GET_CHARGEBACKS_COMPLETED,
      payload: {
        totalItems: result.totalElements,
        totalPages: result.totalPages,
        currentPage: result.number,
        content: chargebacks,
      },
    });
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch({
      type: GET_CHARGEBACKS_FAILED,
      payload: errorWithMessage,
    });
  }
};
