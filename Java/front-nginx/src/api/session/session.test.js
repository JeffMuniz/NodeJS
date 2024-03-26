import { signIn } from "./session";

jest.mock("crypto-js");
jest.mock("src/modules/UrlManager/UrlManager");
jest.mock("src/api/httpRequestHandlerLogin.js");

const successResult = { id: 1, value: "Teste" };

const httpRequestHandlerLogin = jest.fn().mockResolvedValue(successResult);

describe("Session - Test Api", () => {
  it("should make request to login", async () => {
    // given
    const Krypton = class {
      constructor(generatedKey) {
        this.generatedKey = generatedKey;
      }

      encrypt = () => ({ encryptedKey: "fake", encryptedData: "fake" });
      decrypt = () => successResult;
    };
    const injection = { httpRequestHandlerLogin, Krypton };
    const payload = {
      cpf: "111.22remoteShellVulner33-99",
      password: "asdfasdfasdf",
    };

    // when
    const result = await signIn(payload, injection);

    // then
    expect(result.data).toEqual(successResult);
  });
});
