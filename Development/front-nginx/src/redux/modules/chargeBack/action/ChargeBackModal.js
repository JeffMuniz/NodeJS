import { simpleAction } from "@utils";
import { RequestTerms, RequestTermsView } from "src/api/chargeBack/chargeBack";
import { fromApi } from "src/api/dtos/chargebackTerms.dto";

import {
  CHARGEBACK_REQUEST_TERMS_INFO_STARTED,
  CHARGEBACK_REQUEST_TERMS_INFO_COMPLETED,
  CHARGEBACK_REQUEST_TERMS_INFO_FAILED,
} from "../reducer/ChargeBackModal";

const chargeBackTermsCompanyStarted = simpleAction(
  CHARGEBACK_REQUEST_TERMS_INFO_STARTED,
)();
const chargeBackTermsCompanyFailed = simpleAction(
  CHARGEBACK_REQUEST_TERMS_INFO_FAILED,
);

export const chargeBackTermsRequest = ({
  companyId,
  reason,
}) => async dispatch => {
  dispatch(chargeBackTermsCompanyStarted);

  try {
    const payload = await RequestTerms({ companyId, reason });
    dispatch({ type: CHARGEBACK_REQUEST_TERMS_INFO_COMPLETED, payload });
  } catch (error) {
    dispatch(chargeBackTermsCompanyFailed(error));
  }
};

export const chargeBackTermsViewRequest = termId => async dispatch => {
  dispatch(chargeBackTermsCompanyStarted);

  try {
    const { data } = await RequestTermsView(termId);
    const payload = await fromApi(data);

    dispatch({
      type: CHARGEBACK_REQUEST_TERMS_INFO_COMPLETED,
      payload,
    });
  } catch (error) {
    dispatch(chargeBackTermsCompanyFailed(error));
  }
};
