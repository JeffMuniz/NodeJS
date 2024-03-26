import { getRHUrl, getChargeUrl } from "src/modules/UrlManager/UrlManager";
import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getGroupAndUserIdFromState } from "@utils/session";
import { toOnlyNumbers } from "@utils/stringHelper";

import { fromApi } from "../dtos/invoices.dto";
import { detailsFromApi } from "../dtos/invoicesDetails.dto";

const URL_CHARGE_API = getChargeUrl();

export const getInvoices = async ({
  userId,
  groupId,
  searchFilterKey,
  searchFilterValue,
  initialDate,
  finalDate,
  pageNumber = 0,
  pageSize = 20,
}) => {
  const url = `${URL_CHARGE_API}/financeiro/recebiveis`;

  let filterKey = "";
  let filterValue = searchFilterValue;

  if (searchFilterKey === "orderId") {
    filterKey = "idPedido";
  } else if (searchFilterKey === "costCenter") {
    filterKey = "centroCusto";
  } else {
    filterKey = "cnpjPagador";
    filterValue = toOnlyNumbers(searchFilterValue);
  }

  const params = {
    idGrupoEmpresa: groupId,
    idUsuario: userId,
    [filterKey]: filterValue,
    dataVencimentoInicial: initialDate,
    dataVencimentoFinal: finalDate,
    paginaAtual: pageNumber,
    tamanhoPagina: pageSize,
  };

  const response = await httpRequestHandler({
    url,
    method: httpMethod.GET,
    params,
  });

  return fromApi(response.data);
};

export const getDocument = async ({ receivableId, selectedExportOption }) => {
  const {
    groupId: idGrupoEmpresa,
    userId: idUsuario,
  } = getGroupAndUserIdFromState();

  const url = `${URL_CHARGE_API}/financeiro/recebiveis/${receivableId}/documentos`;
  const params = {
    idRecebivel: receivableId,
    tipoDocumento: selectedExportOption,
    idUsuario,
    idGrupoEmpresa,
  };

  const response = await httpRequestHandler({
    url,
    method: httpMethod.GET,
    params,
  });

  return response;
};

export const getReceivableId = async ({
  idGroup,
  idUser,
  orderId,
  cnpj,
  costCenter,
  onSuccess,
  onError = () => null,
  onFinally = () => null,
}) => {
  const url = `${URL_CHARGE_API}/financeiro/recebiveis`;

  const centroCusto =
    !!costCenter && costCenter !== "N/D" ? costCenter : undefined;

  return httpRequestHandler({
    url,
    params: {
      idGrupoEmpresa: idGroup,
      idUsuario: idUser,
      idPedido: orderId,
      cnpjPagador: toOnlyNumbers(cnpj),
      centroCusto,
    },
    method: httpMethod.GET,
  })
    .then(response => onSuccess(fromApi(response.data)))
    .catch(onError)
    .finally(onFinally);
};

export const getInvoiceDetails = async ({
  invoice,
  idGroup,
  idUser,
  page = 0,
  size = 10,
}) => {
  const url = `${getRHUrl()}/financeiros/${invoice}`;

  const params = {
    idGrupoEmpresa: idGroup,
    idUsuario: idUser,
    pageNumber: page,
    pageSize: size,
  };
  try {
    const response = await httpRequestHandler({
      url,
      method: httpMethod.GET,
      params,
    });
    return detailsFromApi(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
};

export default { getInvoices, getReceivableId };
