import React from "react";
import { node, func, bool } from "prop-types";
import { SvgIcon } from "@common";

import Overlay from "../Overlay";
import { ModalContent, CloseModalButton } from "./Modal.styles";

const Modal = ({
  children,
  closeModalOnOverlayClick,
  closeModal,
  hideCloseButton,
}) => (
  <Overlay onClick={closeModalOnOverlayClick}>
    <ModalContent id="modal_content">
      <CloseModalButton
        id="close_modal"
        onClick={closeModal}
        hideMe={hideCloseButton}
      >
        <SvgIcon name="close" />
      </CloseModalButton>
      {children}
    </ModalContent>
  </Overlay>
);

Modal.propTypes = {
  children: node.isRequired,
  closeModalOnOverlayClick: func.isRequired,
  closeModal: func.isRequired,
  hideCloseButton: bool,
};

Modal.defaultProps = {
  hideCloseButton: false,
};

export default Modal;
