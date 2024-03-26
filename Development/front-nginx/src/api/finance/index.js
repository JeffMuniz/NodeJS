import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";

const baseUrl = `${getRHUrl()}/informes-rendimento`;

const findAllReports = ({
  year,
  numberPage,
  sizePage,
  idGrupoEmpresa,
  idUsuario,
  cnpj,
}) =>
  httpRequestHandler({
    url: baseUrl,
    method: httpMethod.GET,
    params: {
      ano: year,
      pagina: numberPage,
      tamanho: sizePage,
      idGrupoEmpresa,
      idUsuario,
      cnpj,
    },
  });

export default {
  findAllReports,
};
