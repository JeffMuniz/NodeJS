import { getRHUrl, getCorporateUrl } from "src/modules/UrlManager/UrlManager";
import httpRequestHandler from "src/api/httpRequestHandler";
import httpMethod from "src/api/httpMethod.enum";

export async function updateUserStatus({
  userId,
  status,
  selectedReason,
  selectedGroupId,
  selectedSubGroupId,
  loggedUserId,
}) {
  const method = httpMethod.PUT;
  const url = `${getRHUrl()}/usuarios/ativacao-portal`;

  const params = selectedSubGroupId
    ? {
        idGrupoEmpresa: selectedGroupId,
        idSubgrupoEmpresa: selectedSubGroupId,
        idUsuario: userId,
      }
    : {
        idGrupoEmpresa: selectedGroupId,
        idUsuario: userId,
      };

  const body = {
    ativo: status,
    motivos: selectedReason,
    idUsuarioLogado: parseInt(loggedUserId, 10),
  };

  const response = await httpRequestHandler({
    url,
    method,
    params,
    body,
  });

  return response.data;
}

export async function getUserStatus({ token, cpf }) {
  const method = httpMethod.GET;
  const params = token || `?cpf=${cpf}`;
  const url = `${getRHUrl()}/usuarios/status${params}`;

  const response = await httpRequestHandler({
    url,
    method,
  });

  return response.data;
}

export async function getUserStatusTerm({ cpf, serviceChannelId }) {
  const method = httpMethod.GET;
  const url = `${getCorporateUrl()}/aceite-termos`;
  const params = { cpf, idCanalAtendimento: serviceChannelId };

  const response = await httpRequestHandler({
    url,
    method,
    params,
  });

  return response.data;
}

export async function postUserStatusTerm({ cpf, serviceChannelId }) {
  const method = httpMethod.POST;
  const url = `${getCorporateUrl()}/aceite-termos`;
  const body = { cpf, idCanalAtendimento: serviceChannelId, aceite: true };

  const response = await httpRequestHandler({
    url,
    method,
    body,
  });

  return response.data;
}
