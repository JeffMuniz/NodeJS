import SubgroupDTO from "./subgroup.dto";

describe("API DTO - Subgroup", () => {
  it("should parse api result to object mapped to Subgroup entity", () => {
    // given
    const apiParentCompanyResponse = {
      id: 1,
      nomeSubGrupo: "Parent Company Test",
      empresas: [
        {
          id: 1,
          nome: "Subgroup 1",
          cnpj: "123456789012",
        },
      ],
    };

    const parentCompany = {
      id: 1,
      name: "Parent Company Test",
      companies: [
        {
          id: 1,
          name: "Subgroup 1",
          cnpj: "123456789012",
        },
      ],
    };

    // when
    const parsedParentCompany = SubgroupDTO.fromApi(apiParentCompanyResponse);

    // then
    expect(parsedParentCompany).toEqual(parentCompany);
  });
});
