export const SHOW_TOAST = "project/toast/SHOW_TOAST";

export const showToast = toast => dispatch => {
  dispatch({ type: SHOW_TOAST, payload: toast });
};
