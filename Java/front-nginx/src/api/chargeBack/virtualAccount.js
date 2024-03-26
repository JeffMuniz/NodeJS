import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRHUrlV2 } from "src/modules/UrlManager/UrlManager";
import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";

const baseUrl = `${getRHUrlV2()}`;

const dataInicio = DateManager()
  .subtract(30, "days")
  .format(dateHourFormats.longDateUS);
const dataFim = DateManager().format(dateHourFormats.longDateUS);

export const getStatement = ({
  numberPage,
  sizePage,
  idGrupoEmpresa,
  idEmpresa,
  idUsuario,
}) =>
  httpRequestHandler({
    url: `${baseUrl}/empresas/${idEmpresa}/extrato`,
    method: httpMethod.GET,
    params: {
      dataInicio,
      dataFim,
      pagina: numberPage,
      tamanho: sizePage,
      idUsuario,
      idGrupoEmpresa,
    },
  });

export const getGroupBalance = ({ idGrupoEmpresa, idUsuario }) =>
  httpRequestHandler({
    url: `${baseUrl}/grupos/${idGrupoEmpresa}/saldo`,
    method: httpMethod.GET,
    params: {
      idUsuario,
      idGrupoEmpresa,
    },
  });

export const getCompanyBalance = ({
  idGrupoEmpresa,
  idUsuario,
  companyId,
  idEmpresa,
}) => {
  if (companyId) {
    return httpRequestHandler({
      url: `${baseUrl}/empresas/${companyId}/saldo`,
      method: httpMethod.GET,
      params: {
        idUsuario,
        idGrupoEmpresa,
      },
    });
  }
  return httpRequestHandler({
    url: `${baseUrl}/empresas/${idEmpresa}/saldo`,
    method: httpMethod.GET,
    params: {
      idUsuario,
      idGrupoEmpresa,
    },
  });
};
