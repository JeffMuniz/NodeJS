import httpRequestHandler from "src/api/httpRequestHandler";
import httpMethod from "src/api/httpMethod.enum";
import { getPortadorUrl } from "src/modules/UrlManager/UrlManager";

export async function getStatements(
  { idAccount, startsAt, endsAt },
  page,
  size = 200,
  injection,
) {
  const url = `${getPortadorUrl()}/contas/${idAccount}/extratos?page=${page}&size=${size}&dataInicio=${startsAt}&dataFim=${endsAt}`;
  const dependencies = { httpRequestHandler, ...injection };
  const result = await dependencies.httpRequestHandler({
    url,
    method: httpMethod.GET,
  });

  return result;
}
