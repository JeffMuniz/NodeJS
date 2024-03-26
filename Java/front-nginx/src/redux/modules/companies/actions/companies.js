import {
  RESET_COMPANIES_STATE,
  COMPANY_COMPLETED,
} from "../reducer/companiesReducer";

export const setCompanies = ({ companies: content }) => async dispatch => {
  await dispatch({ type: RESET_COMPANIES_STATE });

  dispatch({
    type: COMPANY_COMPLETED,
    payload: {
      totalItems: content.length,
      content,
    },
  });
};
