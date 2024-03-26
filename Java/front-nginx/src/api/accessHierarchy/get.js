import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRHUrl } from "src/modules/UrlManager/UrlManager";
import { toOnlyNumbers } from "@utils";

export default async function getAccessHierarchy({
  cpf,
  idGroup,
  idLoggedUser,
}) {
  try {
    return await httpRequestHandler({
      url: `${getRHUrl()}/usuarios/hierarquia-acessos`,
      method: httpMethod.GET,
      params: {
        cpf: toOnlyNumbers(cpf),
        idUsuarioLogado: idLoggedUser,
        idGrupoEmpresa: idGroup,
      },
    });
  } catch (error) {
    throw error;
  }
}
