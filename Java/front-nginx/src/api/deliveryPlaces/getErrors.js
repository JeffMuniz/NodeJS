import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";

export const getDeliveryPlacesErrors = async (
  {
    fileId,
    page,
    size,
    groupId: idGrupoEmpresa,
    loggedUserId: idUsuarioLogado,
  },
  injection,
) => {
  const dependencies = { httpRequestHandler, ...injection };
  const url = `${getRHUrl()}/unidades-entrega/arquivos/${fileId}/erros`;
  const params = {
    page,
    size,
    idUsuarioLogado,
    idGrupoEmpresa,
  };

  return dependencies.httpRequestHandler({
    method: httpMethod.GET,
    url,
    params,
  });
};
