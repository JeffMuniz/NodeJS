import React, { Component } from "react";
import ReactDOM from "react-dom";
import isFunction from "lodash/isFunction";
import { func, bool, node, shape } from "prop-types";
import { connect } from "react-redux";
import { CloseModal } from "src/redux/modules/modal/actions/modal";
import ModalComponent from "./Modal";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modal = document.createElement("div");
    this.modal.id = "modal_body";
  }

  componentDidMount() {
    modalRoot.appendChild(this.modal);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modal);
  }

  handleCloseModal = () => {
    const {
      closeModal,
      modalProps: { customCloseModal },
    } = this.props;

    if (isFunction(customCloseModal)) {
      customCloseModal();
      return;
    }

    closeModal();
  };

  closeModalOnOverlayClick = event => {
    const {
      modalProps: { hideCloseButton },
    } = this.props;

    if (event.target.id !== "overlay" || hideCloseButton) return;

    this.handleCloseModal();
  };

  render() {
    const {
      modalBody,
      modalProps: { hideCloseButton },
    } = this.props;

    return ReactDOM.createPortal(
      <ModalComponent
        closeModalOnOverlayClick={this.closeModalOnOverlayClick}
        closeModal={this.handleCloseModal}
        hideCloseButton={hideCloseButton}
      >
        {modalBody}
      </ModalComponent>,
      this.modal,
    );
  }
}

Modal.propTypes = {
  modalProps: shape({
    hideCloseButton: bool,
  }),
  modalBody: node,
  closeModal: func.isRequired,
};

Modal.defaultProps = {
  modalBody: {},
  modalProps: {
    hideCloseButton: false,
  },
};

const mapStateToProps = ({
  modal: {
    modalProps: { children, hideCloseButton, customCloseModal },
  },
}) => ({
  modalBody: children,
  modalProps: { hideCloseButton, customCloseModal },
});

const mapDispatchToProps = {
  closeModal: CloseModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
