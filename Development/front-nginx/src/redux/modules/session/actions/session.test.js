import ResponseError from "src/common/entities/ResponseError";
import { SESSION_COMPLETED } from "../reducer/sessionReducer";
// import { signIn, getCode } from "./session";

import { getCode } from "./session";

// let user = null;
let error = null;
let codeResult;

beforeEach(() => {
  // user = {
  //   blockAccess: false,
  //   cpf: "",
  //   email: "",
  //   id: "",
  //   idPlatform: "",
  //   idUserType: "",
  //   incorrectAttempts: 0,
  //   login: "",
  //   name: "",
  //   profilesIds: [],
  //   status: 0,
  // };
  codeResult = "asdfasdfasdfasdlkfjasdewpqoiurq==";

  error = { message: "Erro de conexão", status: 500 };
});

describe("Redux Session - Actions", () => {
  // it("should return SESSION_COMPLETED action with user data from external api", async () => {
  //   // given
  //   const fakeDispatch = jest.fn();
  //   const api = {
  //     signIn: jest.fn().mockResolvedValue({ data: { user } }),
  //   };

  //   const injection = { api };
  //   const payload = { email: "userteste@test.com", password: "123Teste" };

  //   // when
  //   await signIn(payload, injection)(fakeDispatch);

  //   // then
  //   expect(fakeDispatch).toBeCalledWith({
  //     payload: { accessToken: undefined, publicKey: undefined },
  //     type: "project/session/SESSION_COMPLETED",
  //   });
  // });

  it("should return SESSION_COMPLETED action with code from external api", async () => {
    // given
    const fakeDispatch = action => action;
    const api = {
      getCode: jest.fn().mockResolvedValue({ data: { codeResult } }),
      validateCode: jest.fn().mockResolvedValue({ data: { codeResult } }),
    };

    const injection = { api };

    // when
    const result = await getCode(injection)(fakeDispatch);

    // then
    expect(result.type).toEqual(SESSION_COMPLETED);
  });

  it("should throw ResponseError when code is undefined", async () => {
    // given
    const fakeDispatch = action => action;
    const api = {
      getCode: jest.fn().mockResolvedValue({ data: {} }),
    };
    const expectedError = new ResponseError().getError();
    const injection = { api };

    // when
    try {
      await getCode(injection)(fakeDispatch);
    } catch (e) {
      error = e;
    }

    // then
    expect(error).toEqual(expectedError);
  });

  // it("should throw ResponseError login when get error from external api", async () => {
  //   // given
  //   const fakeDispatch = action => action;
  //   const expectedError = new ResponseError({ status: 500 }).getError();

  //   const api = {
  //     signIn: jest.fn().mockImplementation(() => Promise.reject(error)),
  //   };
  //   const injection = { api };
  //   const payload = { email: "userteste@test.com", password: "123Teste" };

  //   // when
  //   try {
  //     await signIn(payload, injection)(fakeDispatch);
  //   } catch (e) {
  //     error = e;
  //   }

  //   // then
  //   expect(error).toEqual(expectedError);
  // });
});
