import { getPortadorUrl } from "src/modules/UrlManager/UrlManager";
import httpRequestHandler from "../httpRequestHandler";
import httpMethod from "../httpMethod.enum";

export const getTrackingsByCPF = cpf =>
  httpRequestHandler({
    url: `${getPortadorUrl()}/rastreamento/${cpf}`,
    method: httpMethod.GET,
  });
