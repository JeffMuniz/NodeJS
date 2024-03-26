import { simpleAction } from "@utils";

import { SELECT_INVOICE } from "../reducer/financesReducer";

const setInvoice = simpleAction(SELECT_INVOICE);

export const selectInvoice = invoice => dispatch =>
  dispatch(setInvoice(invoice));

export const clearInvoice = () => dispatch => dispatch(setInvoice({}));
