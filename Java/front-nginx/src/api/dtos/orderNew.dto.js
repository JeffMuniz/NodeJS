export default class OrderNewDto {
  constructor(data = {}) {
    this.file = data.id || "";
    this.idUser = data.idUser || "";
    this.idGroup = data.idGroup || "";
  }

  static fromApi(data = {}) {
    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("idGrupoEmpresa", data.idGroup);
    formData.append("idUsuario", data.idUser);

    return formData;
  }
}
