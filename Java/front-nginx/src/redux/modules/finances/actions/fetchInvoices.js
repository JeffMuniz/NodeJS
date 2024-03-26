import api from "src/api/invoice/invoice";
import { simpleAction } from "@utils";

import {
  GET_INVOICES_STARTED,
  GET_INVOICES_COMPLETED,
  GET_INVOICES_FAILED,
  RESET_INVOICES,
} from "../reducer/financesReducer";

export const setIsLoading = simpleAction(GET_INVOICES_STARTED)();
export const setComplete = simpleAction(GET_INVOICES_COMPLETED);
export const setError = simpleAction(GET_INVOICES_FAILED);
const resetInvoicesAction = simpleAction(RESET_INVOICES)();

export const fetchInvoices = ({
  idUser,
  idGroup,
  searchFilterKey,
  searchFilterValue,
  initialDate,
  finalDate,
  pageNumber,
  pageSize,
} = {}) => async dispatch => {
  dispatch(setIsLoading);

  try {
    const payload = await api({
      idUser,
      idGroup,
      searchFilterKey,
      searchFilterValue,
      initialDate,
      finalDate,
      pageNumber,
      pageSize,
    });

    dispatch(setComplete(payload));

    return payload;
  } catch (err) {
    dispatch(setError(err));
    throw err;
  }
};

export const resetInvoices = () => dispatch => {
  dispatch(resetInvoicesAction);
};
