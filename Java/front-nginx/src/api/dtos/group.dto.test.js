import GroupDto, { ordersLimitFromApi } from "./group.dto";

describe("API DTO - Group", () => {
  it("should parse api result to object mapped to Group entity", () => {
    // given
    const apiGroupResponse = {
      id: 1,
      grupoEmpresa: {
        id: 2,
        nomeGrupo: "Group Test",
      },
    };

    const group = {
      idPermission: 1,
      id: 2,
      name: "Group Test",
    };

    // when
    const parsedGroup = GroupDto.fromApi(apiGroupResponse);

    // then
    expect(parsedGroup).toEqual(group);
  });

  it("should parse api result to object mapped to ordersLimitFromApi", () => {
    // given
    const data = {
      porcentagemUtilizado: 10,
      valorDisponivel: 900,
      valorUtilizado: 100,
      valorLimiteDisponivel: 1000,
      validaLimite: true,
    };

    const limite = {
      ordersLimit: {
        percentage: 10,
        availableValue: 900,
        totalLimit: 1000,
        usedLimit: 100,
        checkForLimit: true,
      },
    };

    // when
    const parsedGroup = ordersLimitFromApi({ data });

    // then
    expect(parsedGroup).toEqual(limite);
  });
});
