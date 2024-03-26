import UserDto from "./user.dto";

describe("API DTO - User", () => {
  it("should parse api result to object mapped to User entity", () => {
    // given
    const apiUserResponse = {
      bloquearAcesso: false,
      cpf: 12345678910,
      email: "test@test.com",
      id: 2,
      idPlataforma: 1,
      idTipoUsuario: 1,
      idsPerfis: [
        {
          descricao: "master",
          id: 1,
        },
      ],
      login: "test@test.com",
      nome: "test",
      status: 1,
      tentativasIncorretas: 0,
    };

    const user = {
      blockAccess: false,
      cpf: "12345678910",
      email: "test@test.com",
      id: "2",
      idPlatform: "1",
      idAccount: "",
      idUserType: "1",
      incorrectAttempts: 0,
      login: "test@test.com",
      name: "test",
      profilesIds: [
        {
          descricao: "master",
          id: 1,
        },
      ],
      status: "1",
    };

    // when
    const parsedUser = UserDto.fromApi(apiUserResponse);

    // then
    expect(parsedUser).toEqual(user);
  });

  it("should parse api result to object mapped to User entity with default attrs", () => {
    // given
    const user = {
      blockAccess: false,
      cpf: "",
      email: "",
      id: "",
      idPlatform: "",
      idAccount: "",
      idUserType: "",
      incorrectAttempts: 0,
      login: "",
      name: "",
      profilesIds: [],
      status: 0,
    };

    // when
    const parsedUser = UserDto.fromApi();

    // then
    expect(parsedUser).toEqual(user);
  });
});
