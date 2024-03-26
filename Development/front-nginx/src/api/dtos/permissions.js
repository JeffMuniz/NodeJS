export const fromApi = (permissions = {}) => {
  const permissionsList = permissions.data.content || [];
  return {
    permissions: permissionsList.map(
      ({ id, idUsuario: idUser, grupoEmpresa: { id: idCompany } }) => ({
        idCompany,
        id,
        idUser,
      }),
    ),
  };
};
