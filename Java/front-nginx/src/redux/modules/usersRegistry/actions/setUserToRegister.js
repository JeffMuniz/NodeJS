import { simpleAction } from "@utils";

import { SET_SELECTED_USER_COMPLETED } from "./getAccessHierarchy";

export const setUserToRegister = ({
  name,
  cpf,
  email,
  birthDate,
  phone,
  mother,
}) => async dispatch =>
  dispatch(
    simpleAction(SET_SELECTED_USER_COMPLETED)({
      name,
      cpf,
      email,
      birthDate,
      phone,
      mother,
    }),
  );
