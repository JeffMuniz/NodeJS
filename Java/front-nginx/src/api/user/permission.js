import { getRHUrl } from "src/modules/UrlManager/UrlManager";

import { fromApi } from "src/api/dtos/usersPermission.dto";
import httpRequestHandler from "src/api/httpRequestHandler";
import httpMethod from "src/api/httpMethod.enum";

export const getUserPermissions = async ({
  page = 0,
  size = 20,
  orderBy = "ASC",
  idCompanyGroup,
  idCompanySubGroup,
  cpf,
  name: nome,
  status = "ATIVO",
}) => {
  const response = await httpRequestHandler({
    url: `${getRHUrl()}/permissoes/acessos`,
    method: httpMethod.GET,
    params: {
      page,
      size,
      orderBy,
      idGrupoEmpresa: idCompanyGroup,
      idSubgrupoEmpresa: idCompanySubGroup,
      cpf,
      nome,
      status,
    },
  });

  return fromApi(response.data);
};
