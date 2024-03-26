import { toString } from "@utils";
import User from "src/common/entities/User";

export default class UserDto {
  constructor(data = {}) {
    this.blockAccess = data.blockAccess;
    this.cpf = data.cpf;
    this.email = data.email;
    this.id = data.id;
    this.idPlatform = data.idPlatform;
    this.idUserType = data.idUserType;
    this.profilesIds = data.profilesIds;
    this.login = data.login;
    this.name = data.name;
    this.status = data.status;
    this.incorrectAttempts = data.incorrectAttempts;
  }

  static fromApi(data = {}) {
    const object = {
      blockAccess: data.bloquearAcesso,
      cpf: toString(data.cpf),
      email: data.email,
      id: toString(data.id),
      idPlatform: toString(data.idPlataforma),
      idUserType: toString(data.idTipoUsuario),
      profilesIds: data.idsPerfis,
      login: data.login,
      name: data.nome,
      status: toString(data.status),
      incorrectAttempts: toString(data.tentativasIncorretas),
    };

    return new User({ ...object });
  }
}
