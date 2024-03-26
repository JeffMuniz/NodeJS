import { getCode, validateCode } from "./code";

jest.mock("crypto-js");

describe("Code - Test Api", () => {
  it("should make request to getCode", async () => {
    // given
    const successResult = { code: "asdf" };
    const httpRequestHandler = jest.fn().mockResolvedValue(successResult);
    const injection = { httpRequestHandler };

    // when
    const result = await getCode(injection);

    // then
    expect(result).toEqual(successResult);
  });

  it("should make request to validateCode", async () => {
    // given
    const successResult = { token: "asdf" };
    const httpRequestHandler = jest.fn().mockResolvedValue(successResult);
    const Krypton = class {
      constructor(generatedKey) {
        this.generatedKey = generatedKey;
      }

      encrypt = () => ({ encryptedKey: "fake", encryptedData: "fake" });
      decrypt = () => successResult;
    };
    const injection = { httpRequestHandler, Krypton };
    const payload = { code: "asdf" };

    // when
    const { data: result } = await validateCode(payload, injection);

    // then
    expect(result).toEqual(successResult);
  });
});
