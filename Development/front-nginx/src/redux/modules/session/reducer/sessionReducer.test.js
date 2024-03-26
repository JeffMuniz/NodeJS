import { requestStatus } from "@enums";

import sessionReducer, {
  SESSION_COMPLETED,
  SESSION_STARTED,
  SESSION_FAILED,
} from "./sessionReducer";

jest.mock("../actions/session");

let initialState = null;

let error = null;

beforeEach(() => {
  initialState = {
    accessToken: null,
    error: null,
    publicKey: null,
    requestStatus: "none",
    timestamp: null,
    validatedTimestamp: null,
  };

  error = { message: "Not Found", code: 404 };
});

describe("Redux session - Reducer", () => {
  it("should return initial state", () => {
    // given

    // when
    const result = sessionReducer();

    // then
    expect(result).toEqual(initialState);
  });

  it("should return state with requestStatus loading when receiving SESSION_STARTED", () => {
    // given
    const action = { type: SESSION_STARTED, payload: null };

    // when
    const result = sessionReducer(initialState, action);

    // then
    expect(result.requestStatus).toEqual("loading");
  });

  it("should return state requestStatus success when receiving SESSION_COMPLETED", () => {
    // given
    const action = {
      type: SESSION_COMPLETED,
      payload: {
        accessToken: "fake",
        publicKey: "fake",
        timestamp: "fake",
        validatedTimestamp: "fake",
      },
    };

    // when
    const result = sessionReducer(initialState, action);

    // then
    expect(result).toMatchObject({
      ...initialState,
      accessToken: "fake",
      error: null,
      publicKey: "fake",
      requestStatus: "success",
      timestamp: "fake",
      validatedTimestamp: "fake",
    });
  });

  it("should return state with error and requestStatus error when receiving SESSION_FAILED", () => {
    // given
    const action = {
      type: SESSION_FAILED,
      payload: error,
    };

    // when
    const result = sessionReducer(initialState, action);

    // then
    expect(result).toMatchObject({
      ...initialState,
      error,
      requestStatus: requestStatus.error,
    });
  });
});
