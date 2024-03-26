import { requestStatus } from "@enums";

import userReducer, {
  USER_STARTED,
  USER_COMPLETED,
  USER_FAILED,
  USER_RESET,
  CREATE_PASSWORD_START,
  CREATE_PASSWORD_COMPLETED,
  CREATE_PASSWORD_FAILED,
  FORGOTPASSWORD_COMPLETED,
  FORGOTPASSWORD_STARTED,
  FORGOTPASSWORD_FAILED,
} from "./userReducer";

jest.mock("src/redux/modules/user/actions/setAccessPermissionTab");
jest.mock("src/redux/modules/user/actions/getAccessLevel");

let initialState = null;
let user = null;
let error = null;

beforeEach(() => {
  user = {
    blockAccess: false,
    cpf: "12345678910",
    email: "",
    id: "",
    idPlatform: "",
    idUserType: "",
    incorrectAttempts: 0,
    login: "",
    name: "",
    profilesIds: [],
    status: 0,
  };
  initialState = {
    accessLevel: "",
    profile: {
      error: null,
      requestStatus: requestStatus.none,
      data: null,
    },
    isAuthenticated: false,
    usersPermissions: [],
    totalUsersPermissions: 0,
    accessPermissionActiveTab: null,
    createPassword: {
      requestStatus: requestStatus.none,
      error: null,
    },
    forgotPassword: {
      requestStatus: requestStatus.none,
      error: null,
    },
  };
  error = { message: "Not Found", code: 404 };
});

describe("Redux User - Reducer", () => {
  it("should return initial state", () => {
    // given

    // when
    const result = userReducer();

    // then
    expect(result).toMatchObject(initialState);
  });

  it("should return state with requestStatus loading when receiving USER_STARTED", () => {
    // given
    const action = { type: USER_STARTED };
    const payloadExpect = {
      ...initialState,
      profile: {
        ...initialState.profile,
        requestStatus: requestStatus.loading,
      },
    };
    // when
    const result = userReducer(initialState, action);

    // then
    expect(result).toEqual(payloadExpect);
  });

  it("should return state with USER when receiving USER_COMPLETED", () => {
    // given
    const action = { type: USER_COMPLETED, payload: user };
    const payloadExpect = {
      ...initialState,
      profile: {
        ...initialState.profile,
        data: user,
        requestStatus: requestStatus.success,
      },
      isAuthenticated: false,
    };
    // when
    const result = userReducer(initialState, action);

    // then
    expect(result).toEqual(payloadExpect);
  });

  it("should return state with requestStatus loading when receiving USER_RESET", () => {
    // given
    const action = { type: USER_RESET };

    // when
    const result = userReducer(initialState, action);

    // then
    expect(result).toEqual(initialState);
  });

  it("should return state with requestStatus failed when receiving USER_FAILED", () => {
    // given
    const action = {
      type: USER_FAILED,
      payload: { message: "erro", status: 500 },
    };
    const payloadExpect = {
      ...initialState,
      profile: {
        ...initialState.profile,
        error: action.payload,
        requestStatus: requestStatus.error,
      },
      isAuthenticated: initialState.isAuthenticated,
    };
    // when
    const result = userReducer(initialState, action);

    // then
    expect(result).toEqual(payloadExpect);
  });
  describe("Redux Reducer - Create Password", () => {
    it("should return initial state", () => {
      // given

      // when
      const result = userReducer();

      // then
      expect(result).toEqual(initialState);
    });

    it("should return state with requestStatus loading when receiving CREATE_PASSWORD_START", () => {
      // given
      const action = {
        type: CREATE_PASSWORD_START,
      };

      // when
      const result = userReducer(initialState, action);

      // then
      expect(result).toEqual({
        ...initialState,
        createPassword: {
          ...initialState.createPassword,
          error: null,
          requestStatus: requestStatus.loading,
        },
      });
    });

    it("should return state with user and requestStatus success when receiving CREATE_PASSWORD_COMPLETED", () => {
      // given
      const action = {
        type: CREATE_PASSWORD_COMPLETED,
      };

      // when
      const result = userReducer(initialState, action);

      // then
      expect(result).toEqual({
        ...initialState,
        createPassword: {
          ...initialState.createPassword,
          error: null,
          requestStatus: requestStatus.success,
        },
      });
    });

    it("should return state with error and requestStatus error when receiving CREATE_PASSWORD_FAILED", () => {
      // given
      const action = {
        type: CREATE_PASSWORD_FAILED,
        payload: error,
      };

      // when
      const result = userReducer(initialState, action);

      // then
      expect(result).toEqual({
        ...initialState,
        createPassword: {
          ...initialState.createPassword,
          error,
          requestStatus: requestStatus.error,
        },
      });
    });

    it("should return state with requestStatus loading when receiving FORGOTPASSWORD_STARTED", () => {
      // given
      const action = {
        type: FORGOTPASSWORD_STARTED,
        payload: null,
      };

      // when
      const result = userReducer(initialState, action);

      // then
      expect(result).toEqual({
        ...initialState,
        forgotPassword: {
          ...initialState.forgotPassword,
          requestStatus: requestStatus.loading,
        },
      });
    });

    it("should return state with user and requestStatus success when receiving FORGOTPASSWORD_COMPLETED", () => {
      // given
      const action = {
        type: FORGOTPASSWORD_COMPLETED,
        payload: {},
      };

      // when
      const result = userReducer(initialState, action);

      // then
      expect(result).toEqual({
        ...initialState,
        forgotPassword: {
          ...initialState.forgotPassword,
          requestStatus: requestStatus.success,
        },
      });
    });

    it("should return state with error and requestStatus error when receiving FORGOTPASSWORD_FAILED", () => {
      // given
      const action = {
        type: FORGOTPASSWORD_FAILED,
        payload: error,
      };

      // when
      const result = userReducer(initialState, action);

      // then
      expect(result).toEqual({
        ...initialState,
        forgotPassword: {
          ...initialState.forgotPassword,
          error,
          requestStatus: requestStatus.error,
        },
      });
    });
  });
});
