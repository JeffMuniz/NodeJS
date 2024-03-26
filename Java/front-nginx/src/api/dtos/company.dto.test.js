import CompanyDto from "./company.dto";

describe("API DTO - Company", () => {
  it("should parse api result to object mapped to Company entity", () => {
    // given
    const apiCompanyResponse = {
      id: 1,
      nome: "Company Test",
      cnpj: "98476323000150",
    };

    const company = {
      id: 1,
      name: "Company Test",
      cnpj: "98476323000150",
    };

    // when
    const parsedCompany = CompanyDto.fromApi(apiCompanyResponse);

    // then
    expect(parsedCompany).toEqual(company);
  });
});
