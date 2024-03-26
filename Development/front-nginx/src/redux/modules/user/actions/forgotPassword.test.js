import { FORGOTPASSWORD_COMPLETED } from "../reducer/userReducer";
import { forgotPassword } from "./forgotPassword";
import ResponseError from "../../../../common/entities/ResponseError";

let error = null;

beforeEach(() => {
  error = { message: "Not Found", code: 404 };
});

describe("Redux Actions - Forgot Password", () => {
  it("should return FORGOTPASSWORD_COMPLETED action with user data from external api", async () => {
    // given
    const fakeDispatch = jest.fn();
    const api = {
      forgotPassword: jest.fn(),
    };
    const injection = { api };
    const payload = { email: "userteste@test.com", cpf: "12345678911" };

    // when
    await forgotPassword(payload, injection)(fakeDispatch);

    // then
    expect(fakeDispatch).toBeCalledWith({
      type: FORGOTPASSWORD_COMPLETED,
    });
  });

  it("should throw ResponseError forgotpassword when get error from external api", async () => {
    // given
    const fakeDispatch = jest.fn();
    const expectedError = new ResponseError({ status: 500 }).getError();
    const api = {
      forgotPassword: jest
        .fn()
        .mockImplementation(() => Promise.reject(expectedError)),
    };
    const injection = { api };
    const payload = { email: "userteste@test.com", cpf: "12345678911" };

    // when
    try {
      await forgotPassword(payload, injection)(fakeDispatch);
    } catch (e) {
      error = e;
    }

    // then
    expect(error).toEqual(expectedError);
  });
});
