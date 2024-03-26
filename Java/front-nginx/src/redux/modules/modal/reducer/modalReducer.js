import { createReducer } from "reduxsauce";

export const OPEN_MODAL = "project/modal/OPEN_MODAL";
export const CLOSE_MODAL = "project/modal/CLOSE_MODAL";

const initialState = {
  modalProps: {},
  showModal: false,
};

const openModal = (state = initialState, { payload }) => ({
  ...state,
  modalProps: payload,
  showModal: true,
});

const closeModal = (state = initialState) => ({
  ...state,
  showModal: false,
});

const handlers = {
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

export default createReducer(initialState, handlers);
