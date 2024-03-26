import { toString } from "@utils";

export const fromApi = (usersPermissionsResponse = {}) => {
  const userList = usersPermissionsResponse.content || [];
  return {
    totalItems: usersPermissionsResponse.totalElements,
    users: userList.map(userPermission => ({
      cpf: toString(userPermission.cpfUsuarioNivel),
      id: toString(userPermission.idPermissao),
      userId: toString(userPermission.idUsuarioNivel),
      name: userPermission.nomeUsuarioNivel,
      email: userPermission.emailUsuarioNivel,
      status: userPermission.status.toLowerCase(),
      idUserRegistry: userPermission.idUsuarioRegistro,
      groupLevel: userPermission.nivelAcesso,
      groupLevelName: userPermission.nomeNivel,
    })),
  };
};
