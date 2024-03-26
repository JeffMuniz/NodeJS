import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const GET_USER_ACCESS_LEVEL_STARTED = "GET_USER_ACCESS_LEVEL_STARTED";
export const GET_USER_ACCESS_LEVEL_COMPLETED =
  "GET_USER_ACCESS_LEVEL_COMPLETED";
export const GET_USER_ACCESS_LEVEL_FAILED = "GET_USER_ACCESS_LEVEL_FAILED";
export const ACCESS_PERMISSION_ACTIVE_TAB =
  "project/user/ACCESS_PERMISSION_ACTIVE_TAB";
export const USER_STARTED = "project/user/USER_STARTED";
export const USER_COMPLETED = "project/user/USER_COMPLETED";
export const USER_FAILED = "project/user/USER_FAILED";
export const USER_RESET = "project/user/USER_RESET";
export const CREATE_PASSWORD_START = "project/user/CREATE_PASSWORD_START";
export const CREATE_PASSWORD_COMPLETED =
  "project/user/CREATE_PASSWORD_COMPLETED";
export const CREATE_PASSWORD_FAILED = "project/user/CREATE_PASSWORD_FAILED";
export const FORGOTPASSWORD_STARTED = "project/user/FORGOTPASSWORD_STARTED";
export const FORGOTPASSWORD_COMPLETED = "project/user/FORGOTPASSWORD_COMPLETED";
export const FORGOTPASSWORD_FAILED = "project/user/FORGOTPASSWORD_FAILED";
export const FORGOTPASSWORD_RESET = "project/user/FORGOTPASSWORD_RESET";

export const USER_STATUS_COMPLETED = "project/user/USER_STATUS_COMPLETED";
export const USER_STATUS_FAILED = "project/user/USER_STATUS_FAILED";
export const USER_STATUS_RESET = "project/user/USER_STATUS_RESET";

const initialState = {
  profile: {
    error: null,
    requestStatus: requestStatus.none,
    data: null,
  },
  createPassword: {
    requestStatus: requestStatus.none,
    error: null,
  },
  forgotPassword: {
    requestStatus: requestStatus.none,
    error: null,
  },
  usersPermissions: [],
  totalUsersPermissions: 0,
  accessPermissionActiveTab: null,
  isAuthenticated: false,
  accessLevel: "",
};

const setAccessLevelStarted = (state = initialState) => ({
  ...state,
  accessLevel: "",
});

const setAccessLevelCompleted = (state = initialState, { payload }) => ({
  ...state,
  accessLevel: payload,
});

const setAccessLevelFailed = (state = initialState) => ({
  ...state,
  accessLevel: "",
});

const setLoading = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.loading,
  },
});

const setSuccess = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.success,
  },
});

const setFailed = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.error,
    error: payload,
  },
});

const userCompleted = (state = initialState, { payload }) => ({
  ...state,
  profile: {
    ...initialState.profile,
    requestStatus: requestStatus.success,
    data: payload,
  },
  isAuthenticated: false,
  // só pode considerar autenticado se o usuário:
  //  - não estiver anonimizado
  //  - status ativo
  //  - aceito o termo
  //  - data nascimento, telefone e nome da mãe preenchidos
});

const userFailed = (state = initialState, { payload }) => ({
  ...state,
  profile: {
    ...initialState.profile,
    error: payload,
    requestStatus: requestStatus.error,
  },
  isAuthenticated: false,
});

const userReset = (state = initialState) => ({
  ...state,
  profile: initialState.profile,
  isAuthenticated: initialState.isAuthenticated,
});

const userStatusCompleted = (state = initialState, { isValidLogin }) => ({
  ...state,
  isAuthenticated: isValidLogin,
});

const userStatusFailed = (state = initialState) => ({
  ...state,
  isAuthenticated: false,
});

const userStatusReset = (state = initialState) => ({
  ...state,
  isAuthenticated: initialState.isAuthenticated,
});

const activeTab = (state = initialState, { payload }) => ({
  ...state,
  accessPermissionActiveTab: payload,
});

const reset = key => (state = initialState) => ({
  ...state,
  [key]: initialState[key],
});

const handlers = {
  [USER_STARTED]: setLoading("profile"),
  [USER_COMPLETED]: userCompleted,
  [USER_FAILED]: userFailed,
  [USER_RESET]: userReset,
  [USER_STATUS_COMPLETED]: userStatusCompleted,
  [USER_STATUS_FAILED]: userStatusFailed,
  [USER_STATUS_RESET]: userStatusReset,
  [CREATE_PASSWORD_START]: setLoading("createPassword"),
  [CREATE_PASSWORD_COMPLETED]: setSuccess("createPassword"),
  [CREATE_PASSWORD_FAILED]: setFailed("createPassword"),
  [FORGOTPASSWORD_STARTED]: setLoading("forgotPassword"),
  [FORGOTPASSWORD_COMPLETED]: setSuccess("forgotPassword"),
  [FORGOTPASSWORD_FAILED]: setFailed("forgotPassword"),
  [FORGOTPASSWORD_RESET]: reset("forgotPassword"),
  [ACCESS_PERMISSION_ACTIVE_TAB]: activeTab,
  [GET_USER_ACCESS_LEVEL_STARTED]: setAccessLevelStarted,
  [GET_USER_ACCESS_LEVEL_COMPLETED]: setAccessLevelCompleted,
  [GET_USER_ACCESS_LEVEL_FAILED]: setAccessLevelFailed,
};

export default createReducer(initialState, handlers);
