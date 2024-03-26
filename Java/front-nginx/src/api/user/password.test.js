import { createPassword, forgotPassword } from "./password";

const successResult = { id: 1, value: "Teste" };
const httpRequestHandler = jest.fn().mockResolvedValue(successResult);

describe("createPassword - Test Api", () => {
  it("should create password", async () => {
    // given
    const injection = { httpRequestHandler };
    const token = "teste";
    const password = "teste";

    // when
    const result = await createPassword(token, password, injection);

    // then
    expect(result).toEqual(successResult);
  });

  it("should make request to forgot password", async () => {
    // given
    const injection = { httpRequestHandler };
    const payload = { cpf: "12345678901", email: "teste@teste.com" };

    // when
    const result = await forgotPassword(payload, injection);

    // then
    expect(result).toEqual(successResult);
  });
});
