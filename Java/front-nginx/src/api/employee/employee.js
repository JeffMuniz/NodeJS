import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import {
  getEmployeesUrl,
  getRHChargebackUrl,
  getRHUrl,
} from "src/modules/UrlManager/UrlManager";
import { GET_CHARGEBACKS_STRING } from "src/redux/modules/employee/reducer/employeeReducer";

import { toOnlyNumbers } from "@utils";

export const getEmployeesCountTotal = (
  { companyId: idEmpresa },
  status,
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getEmployeesUrl()}/quantidade-funcionarios?status=${status}`;
  const params = { idEmpresa };
  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};

export const getEmployeesCountActivesInactives = (
  { companyId: idEmpresa },
  status,
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getEmployeesUrl()}/quantidade-funcionarios?status=${status}`;
  const params = { idEmpresa };
  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};

export const getEmployees = (
  { page, size, companyId: idEmpresa, orderBy, cpf, name: nome, status },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getEmployeesUrl()}/consultar`;
  const queryParams = {
    page,
    size,
    idEmpresa,
    orderBy,
    cpf,
    nome,
  };

  if (status !== 0) {
    queryParams.status = status;
  }

  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params: { page: 0, size: 10, ...queryParams },
  });
};

export const getEmployee = ({ cpf, companyId, employeeStatus }, injection) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getEmployeesUrl()}/consultar?cpf=${toOnlyNumbers(
    cpf,
  )}&idEmpresa=${companyId}&status=${employeeStatus || 1}`;
  return dependencies.httpRequestHandler({
    url,
    method: httpMethod.GET,
  });
};

export const updateEmployee = entity => {
  const url = `${getRHUrl()}/funcionarios/${entity.id}`;
  return httpRequestHandler({
    url,
    method: httpMethod.PUT,
    body: entity,
  });
};

export const getChargebacks = async ({
  page = 0,
  size = 10,
  companyId,
  startDate = null,
  endDate = null,
  reason = null,
  status = null,
  string,
  dispatch,
}) => {
  const start = startDate ? `&dataInicio=${startDate}` : "";
  const end = endDate || startDate ? `&dataFim=${endDate || startDate}` : "";
  const theReason = reason && reason !== "TODOS" ? `&motivo=${reason}` : "";
  const theStatus = status ? `&status=${status}` : "";
  const searchString = string || `${start}${end}${theReason}${theStatus}`;
  dispatch({
    type: GET_CHARGEBACKS_STRING,
    payload: { searchString },
  });
  const url = `${getRHChargebackUrl()}/solicitacoes-estornos/search?idEmpresa=${companyId}&pagina=${page}&tamanho=${size}${searchString}`;
  const dependencies = { httpRequestHandler };
  const result = await dependencies.httpRequestHandler({
    url,
    method: httpMethod.GET,
  });

  return result;
};

export const setChargebackDetails = async params => {
  const url = `${getRHChargebackUrl()}/solicitacoes-estornos/${toOnlyNumbers(
    params,
  )}`;
  const dependencies = { httpRequestHandler };
  const result = await dependencies.httpRequestHandler({
    url,
    method: httpMethod.GET,
  });

  return result;
};

export const getChargebackBody = async ({ params, page = 0, size = 10 }) => {
  const url = `${getRHChargebackUrl()}/solicitacoes-estornos/${params}/detalhes?pagina=${page}&tamanho=${size}`;

  const dependencies = { httpRequestHandler };
  const result = await dependencies.httpRequestHandler({
    url,
    method: httpMethod.GET,
  });

  return result;
};

export const getEmployeeHistory = (cpf, injection) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getEmployeesUrl()}/historico/cpf/${cpf}`;
  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
  });
};

export const updateEmployeesStatus = (body, action, injection) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getEmployeesUrl()}/${action}`;
  return dependencies.httpRequestHandler({
    url,
    method: httpMethod.PUT,
    body,
  });
};
