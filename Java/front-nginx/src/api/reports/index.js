import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";

const baseUrl = `${getRHUrl()}/relatorios`;

const createReport = entity =>
  httpRequestHandler({
    url: baseUrl,
    method: httpMethod.POST,
    body: entity,
  });

const findAllReports = ({
  dataFim,
  dataInicio,
  idGrupoEmpresa,
  idUsuario,
  numberPage,
  sizePage,
}) =>
  httpRequestHandler({
    url: baseUrl,
    method: httpMethod.GET,
    params: {
      dataFim,
      dataInicio,
      idGrupoEmpresa,
      idUsuario,
      numberPage,
      sizePage,
    },
  });

const deleteReport = async body =>
  httpRequestHandler({
    url: `${baseUrl}/deletar`,
    method: httpMethod.POST,
    body,
  });

const downloadOneReport = async ({ idGrupoEmpresa, idUsuario, id }) =>
  httpRequestHandler({
    url: `${baseUrl}/${id}`,
    method: httpMethod.GET,
    responseType: "arraybuffer",
    params: {
      idGrupoEmpresa,
      idUsuario,
    },
  });

export default {
  createReport,
  findAllReports,
  deleteReport,
  downloadOneReport,
};
