export default class User {
  constructor(data = {}) {
    this.blockAccess = data.blockAccess || false;
    this.cpf = data.cpf || "";
    this.email = data.email || "";
    this.id = data.id || "";
    this.idPlatform = data.idPlatform || "";
    this.idUserType = data.idUserType || "";
    this.idAccount = data.idAccount || "";
    this.profilesIds = data.profilesIds || [];
    this.login = data.login || "";
    this.name = data.name || "";
    this.status = data.status || 0;
    this.incorrectAttempts = data.incorrectAttempts || 0;
  }
}
