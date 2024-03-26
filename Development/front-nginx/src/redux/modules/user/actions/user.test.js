import { USER_RESET } from "../reducer/userReducer";
import { resetUser } from "./user";

describe("Redux User - Actions", () => {
  it("should return RESET_user", async () => {
    // given
    const fakeDispatch = action => action;
    const getState = jest.fn(() => ({}));

    // when
    const result = await resetUser()(fakeDispatch, getState);

    // then
    expect(result).toEqual({ type: USER_RESET });
  });
});
