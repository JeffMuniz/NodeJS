import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import {
  getRHChargebackUrl,
  getRHUrl,
} from "src/modules/UrlManager/UrlManager";
import { fromApi } from "../dtos/chargebackTerms.dto";

import { getEstornoHeader, getEstornoBody } from "./mock";

export const FindHeader = ({ id }) => {
  const data = getEstornoHeader.data.filter(
    item => item.id === parseInt(id, 10),
  );

  return { data: data[0] };
};

export const FindDetails = ({ id }) => {
  const data = getEstornoBody.data.filter(item => item.id === parseInt(id, 10));

  return { data: data[0] };
};

export const NewChargeBack = data =>
  httpRequestHandler({
    url: `${getRHChargebackUrl()}/solicitacoes-estornos`,
    method: httpMethod.POST,
    body: data,
  });

export const EmployeeSearch = data =>
  httpRequestHandler({
    url: `${getRHUrl()}/funcionarios/search`,
    method: httpMethod.POST,
    body: data,
  });

export const RequestTerms = async ({ companyId, reason }) => {
  const { data } = await httpRequestHandler({
    url: `${getRHChargebackUrl()}/termo-aceite/pre-visualizacao`,
    method: httpMethod.POST,
    body: { id_empresa: companyId, motivo: reason },
  });
  return fromApi(data);
};

export const RequestTermsView = termId =>
  httpRequestHandler({
    url: `${getRHChargebackUrl()}/termo-aceite/${termId}`,
    method: httpMethod.GET,
  });
