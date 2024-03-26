import { getChargeUrl, getOrderUrl } from "src/modules/UrlManager/UrlManager";
import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getGroupAndUserIdFromState } from "src/utils/session";
import { toOnlyNumbers } from "src/utils";
import {
  fromApi,
  invoiceDetailFromApi,
  ordersByInvoiceFromApi,
} from "../dtos/invoicesUnified.dto";

const URL_UNIFIED_INVOICE = `${getChargeUrl()}/financeiro/faturas-unificadas`;
const URL_UNIFIED_INVOICE_ORDERS = `${getOrderUrl()}/pedidos/faturamento-unificado`;

export const getInvoices = async ({
  periodFilter,
  statusFilter,
  inputFilter,
  page,
  itemsPerPage,
}) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();

  const params = {
    idGrupoEmpresa,
    idUsuario,
    paginaAtual: page,
    tamanhoPagina: itemsPerPage,
  };

  const { startDate, endDate } = periodFilter;

  if (endDate) {
    params.dataVencimentoInicial = startDate;
    params.dataVencimentoFinal = endDate;
  }

  if (statusFilter) {
    params.statusFatura = statusFilter;
  }

  const { typedValue, queryParam } = inputFilter || {};

  if (typedValue) {
    params[queryParam] = typedValue;
  }

  const { data } = await httpRequestHandler({
    url: URL_UNIFIED_INVOICE,
    method: httpMethod.GET,
    params,
  });

  return fromApi(data);
};

export const getInvoiceDetail = async ({
  invoiceId,
  unificationTypeEnum,
  cnpj,
  costCenter,
} = {}) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();

  const params = {
    idGrupoEmpresa,
    idUsuario,
  };

  if (!invoiceId) {
    params.tipoFatura = unificationTypeEnum;
    params.cnpjPagador = toOnlyNumbers(cnpj);
  }

  if (costCenter && costCenter !== "N/D") {
    params.centroCusto = costCenter;
  }

  const { data } = await httpRequestHandler({
    url: `${URL_UNIFIED_INVOICE}/${invoiceId || "aberta"}`,
    method: httpMethod.GET,
    params,
  });

  return invoiceDetailFromApi(data);
};

export const getOrdersByInvoice = async ({
  inputFilter,
  page,
  invoiceParameters,
  itemsPerPage,
} = {}) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();

  const { invoiceId, unificationTypeEnum, cnpj, costCenter } =
    invoiceParameters || {};

  const params = {
    idGrupoEmpresa,
    idUsuario,
    paginaAtual: page,
    tamanhoPagina: itemsPerPage,
  };

  if (costCenter && costCenter !== "N/D") {
    params.centroCusto = costCenter;
  }

  const { typedValue, queryParam } = inputFilter || {};

  if (typedValue) {
    params[queryParam] = toOnlyNumbers(typedValue);
  }

  if (!invoiceId) {
    params.tipoFatura = unificationTypeEnum;
    params.cnpjPagador = toOnlyNumbers(cnpj);
  }

  const { data } = await httpRequestHandler({
    url: `${URL_UNIFIED_INVOICE_ORDERS}/${invoiceId || "aberto"}/cargas`,
    method: httpMethod.GET,
    params,
  });

  return ordersByInvoiceFromApi(data);
};

export const getDocumentUnified = async ({
  invoiceId,
  selectedExportOption,
} = {}) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();

  const params = {
    idFatura: invoiceId,
    tipoDocumento: selectedExportOption,
    idUsuario,
    idGrupoEmpresa,
  };

  const response = await httpRequestHandler({
    url: `${URL_UNIFIED_INVOICE}/${invoiceId}/documentos`,
    method: httpMethod.GET,
    params,
  });

  return response;
};

export default { getInvoices };
