import {
  getEmployees,
  getEmployee,
  getEmployeesCountActivesInactives,
  getEmployeesCountTotal,
} from "./employee";

describe("Employee - Test Api", () => {
  it("should make request to getEmployees", async () => {
    // given
    const successResult = { data: {} };
    const httpRequestHandler = jest.fn().mockResolvedValue(successResult);
    const injection = { httpRequestHandler };

    // when
    const result = await getEmployees({}, injection);

    // then
    expect(result).toEqual(successResult);
  });
  it("should make request to getEmployeesCountTotal", async () => {
    // given
    const successResult = {
      data: {
        totalItems: 4000,
      },
    };
    const httpRequestHandler = jest.fn().mockResolvedValue(successResult);
    const injection = { httpRequestHandler };
    const params = { companyId: 1 };

    // when
    const result = await getEmployeesCountTotal(params, [1, 2], injection);

    // then
    expect(result).toEqual(successResult);
  });
  it("should make request to getEmployeesCountActivesInactives", async () => {
    // given
    const successResult = {
      data: {
        totalItems: 4000,
      },
    };
    const status = 1;
    const httpRequestHandler = jest.fn().mockResolvedValue(successResult);
    const injection = { httpRequestHandler };
    const params = { companyId: 1 };
    // when
    const result = await getEmployeesCountActivesInactives(
      params,
      status,
      injection,
    );

    // then
    expect(result).toEqual(successResult);
  });
  it("should make request to getEmployee", async () => {
    // given
    const cpf = "12309845691";
    const successResult = {
      data: {
        pessoa: {
          cpf,
        },
      },
    };
    const httpRequestHandler = jest.fn().mockResolvedValue(successResult);
    const injection = { httpRequestHandler };
    // when
    const result = await getEmployee(cpf, injection);

    // then
    expect(result).toEqual(successResult);
  });
});
