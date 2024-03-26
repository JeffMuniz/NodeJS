import { getInvoiceDetails as api } from "src/api/invoice/invoice";
import { simpleAction } from "@utils";

import {
  GET_SELECTED_INVOICE_STARTED,
  GET_SELECTED_INVOICE_COMPLETED,
  GET_SELECTED_INVOICE_FAILED,
  RESET_SELECTED_INVOICES,
} from "../reducer/financesReducer";

export const setIsLoading = simpleAction(GET_SELECTED_INVOICE_STARTED)();
export const setComplete = simpleAction(GET_SELECTED_INVOICE_COMPLETED);
export const setError = simpleAction(GET_SELECTED_INVOICE_FAILED)();
export const resetSelectedInvoicesAction = simpleAction(
  RESET_SELECTED_INVOICES,
)();

export const fetchSelectedInvoice = ({
  invoice,
  idGroup,
  idCompany,
  idUser,
  page,
  size,
}) => async dispatch => {
  dispatch(setIsLoading);
  try {
    const payload = await api({
      invoice,
      idGroup,
      idCompany,
      idUser,
      page,
      size,
    });
    dispatch(setComplete(payload));
  } catch (err) {
    dispatch(setError(err));
    throw err;
  }
};

export const resetSelectedInvoices = () => dispatch => {
  dispatch(resetSelectedInvoicesAction);
};
