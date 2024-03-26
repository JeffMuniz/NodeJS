import { simpleAction } from "@utils";

export const CLEAR_USER_REGISTRY = "CLEAR_USER_REGISTRY";

export const clearUserRegistry = () => dispatch =>
  dispatch(simpleAction(CLEAR_USER_REGISTRY)());
