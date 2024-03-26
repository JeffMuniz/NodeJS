import { getRHUrl } from "src/modules/UrlManager/UrlManager";
import httpRequestHandler from "../httpRequestHandler";
import httpMethod from "../httpMethod.enum";

const RH_URL = getRHUrl();

export const getGroups = (userId, injection) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${RH_URL}/permissoes`;

  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params: {
      idUsuario: userId,
      statusDescricao: "ATIVO",
    },
  });
};

export const getSubgroups = ({ idGroup, idUser, page, size }, injection) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${RH_URL}/grupos-empresas/${idGroup}/subgrupos-empresas`;
  const params = { page, size, idUsuario: idUser };
  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};

export const getSubgroupsTree = ({ idGroup, idUser }) => {
  const url = `${RH_URL}/grupos-empresas/${idGroup}/hierarquia-organizacional`;
  const params = { idUsuarioSessao: idUser };
  return httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};

export const getGroupParams = ({ idGroup, idUser }) => {
  const url = `${RH_URL}/grupos-empresas/${idGroup}/parametros`;
  const params = { "id-usuario": idUser };
  return httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};

export const getOrdersLimit = ({ idGroup, userId }) => {
  const url = `${RH_URL}/limite-credito`;
  const params = { idGrupoEmpresa: idGroup, idUsuario: userId };
  return httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};
