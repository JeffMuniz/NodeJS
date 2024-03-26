import { simpleAction } from "@utils";
import { OPEN_MODAL, CLOSE_MODAL } from "../reducer/modalReducer";

const openModal = simpleAction(OPEN_MODAL);
const closeModal = simpleAction(CLOSE_MODAL)();

export const OpenModal = ({
  children,
  hideCloseButton = false,
  customCloseModal,
}) => dispatch =>
  dispatch(
    openModal({
      children,
      hideCloseButton,
      customCloseModal,
    }),
  );

export const CloseModal = () => dispatch => dispatch(closeModal);
