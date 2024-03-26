import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import {
  getPortadorUrl,
  getRHChargebackUrl,
} from "src/modules/UrlManager/UrlManager";

import { toOnlyNumbers } from "@utils";

export const getVouchers = ({ cpf, cnpj }) =>
  httpRequestHandler({
    url: `${getPortadorUrl()}/cartoes/empresas`,
    method: httpMethod.GET,
    params: {
      cpf: toOnlyNumbers(cpf),
      cnpj: toOnlyNumbers(cnpj),
    },
  });

export const updateStatus = ({ id, reason, uptillDate } = {}) =>
  httpRequestHandler({
    url: `${getPortadorUrl()}/cartoes/${id}/status`,
    method: httpMethod.PUT,
    body: { statusCartao: reason, dataAgendamentoFim: uptillDate },
  });

export const chargeBack = ({ id, reason } = {}) =>
  httpRequestHandler({
    url: `${getPortadorUrl()}/cartoes/${id}/chargeBack`, // to do
    method: httpMethod.POST,
    body: { statusCartao: reason },
  });

export const chargeBackReason = () =>
  httpRequestHandler({
    url: `${getRHChargebackUrl()}/motivos`,
    method: httpMethod.GET,
  });

export const chargeBackStatus = () =>
  httpRequestHandler({
    url: `${getRHChargebackUrl()}/status`,
    method: httpMethod.GET,
  });
