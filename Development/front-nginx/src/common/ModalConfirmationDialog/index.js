import React from "react";
import PropTypes from "prop-types";

import { SimpleModal } from "@base";
import { SvgIcon } from "@common";

import { Button, ButtonWrapper, ContentModal, Text } from "./styles";

const ModalConfirmationDialog = ({
  callbackCancelButton,
  callbackSubmitButton,
  closeModal,
  description,
  height,
  iconName,
  textCancelButton,
  textSubmitButton,
  width,
}) => (
  <SimpleModal onClickCloseIcon={closeModal} height={height} width={width}>
    <ContentModal>
      <SvgIcon name={iconName} size={80} />
      <Text>{description}</Text>
      <ButtonWrapper>
        <Button
          id="button_cancel_action"
          onPress={callbackCancelButton || closeModal}
          value={textCancelButton}
          buttonType="light"
        />
        <Button
          id="button_cancel_order_submit"
          onPress={callbackSubmitButton}
          value={textSubmitButton}
          buttonType="warning"
        />
      </ButtonWrapper>
    </ContentModal>
  </SimpleModal>
);

ModalConfirmationDialog.propTypes = {
  callbackCancelButton: PropTypes.func,
  callbackSubmitButton: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  height: PropTypes.string,
  iconName: PropTypes.string,
  textCancelButton: PropTypes.string,
  textSubmitButton: PropTypes.string,
  width: PropTypes.string,
};

ModalConfirmationDialog.defaultProps = {
  callbackCancelButton: null,
  height: "250px",
  iconName: "warning",
  textCancelButton: "não",
  textSubmitButton: "sim",
  width: "430px",
};

export default ModalConfirmationDialog;
