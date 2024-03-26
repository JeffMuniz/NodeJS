import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";

export default function getDeliveryPlaces({
  groupId: idGrupoEmpresa,
  loggedUserId: idUsuarioSessao,
  placeId: codUnidadeEntrega,
  page,
  size,
} = {}) {
  const params = {
    idGrupoEmpresa,
    idUsuarioSessao,
    codUnidadeEntrega,
    page,
    size,
  };

  return httpRequestHandler({
    method: httpMethod.GET,
    url: `${getRHUrl()}/unidades-entrega`,
    params,
  });
}
