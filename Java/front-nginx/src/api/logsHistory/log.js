import { getHistoryLogUrl } from "src/modules/UrlManager/UrlManager";
import httpRequestHandler from "src/api/httpRequestHandler";
import httpMethod from "src/api/httpMethod.enum";

export async function getHistoryLogs(cpfUser) {
  const dependencies = { httpRequestHandler };
  const method = httpMethod.GET;
  const url = `${getHistoryLogUrl()}historicos?chaveSubModulo=${cpfUser}&tipoOrdenacao=DESC`;
  const response = await dependencies.httpRequestHandler({
    url,
    method,
  });

  return response.data;
}
