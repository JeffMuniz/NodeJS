import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getReportUrl } from "src/modules/UrlManager/UrlManager";

export const getReport = idPesquisa =>
  httpRequestHandler({
    url: `${getReportUrl()}/solicitacao`,
    method: httpMethod.GET,
    params: {
      chavePesquisa: idPesquisa,
    },
  });
