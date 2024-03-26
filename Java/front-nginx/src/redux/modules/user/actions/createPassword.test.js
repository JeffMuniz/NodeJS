import {
  CREATE_PASSWORD_COMPLETED,
  CREATE_PASSWORD_FAILED,
} from "../reducer/userReducer";
import { createPassword } from "./createPassword";
import ResponseError from "../../../../common/entities/ResponseError";

describe("Redux Actions - Create Password", () => {
  it("should return CREATE_PASSWORD_COMPLETED action with user data from external api", async () => {
    // given
    const fakeDispatch = jest.fn();
    const api = {
      createPassword: jest.fn().mockResolvedValue(),
    };
    const injection = { api };

    // when
    await createPassword("teste", "teste", injection)(fakeDispatch);

    // then
    expect(fakeDispatch).toBeCalledWith({
      type: CREATE_PASSWORD_COMPLETED,
    });
  });

  it("should return CREATE_PASSWORD_FAILED action when get error from external api", async () => {
    // given
    const fakeDispatch = jest.fn();
    const expectedError = new ResponseError({ status: 500 }).getError();
    const api = {
      createPassword: jest
        .fn()
        .mockImplementation(() => Promise.reject(expectedError)),
    };
    const injection = { api };

    // when
    await createPassword("teste", "teste", injection)(fakeDispatch);

    // then
    expect(fakeDispatch).toBeCalledWith({
      type: CREATE_PASSWORD_FAILED,
      payload: expectedError,
    });
  });
});
