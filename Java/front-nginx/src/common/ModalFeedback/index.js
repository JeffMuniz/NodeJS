import React from "react";
import PropTypes from "prop-types";

import { SimpleModal } from "@base";
import { SvgIcon } from "@common";

import { Button, ButtonWrapper, ContentModal, Text } from "./styles";

const ModalFeedback = ({
  callbackFooterButton,
  closeModal,
  description,
  height,
  iconName,
  textButton,
  width,
}) => (
  <SimpleModal onClickCloseIcon={closeModal} height={height} width={width}>
    <ContentModal>
      <SvgIcon name={iconName} size={80} />
      <Text>{description}</Text>
      <ButtonWrapper>
        <Button
          id="button_modal_feedback"
          onPress={callbackFooterButton || closeModal}
          value={textButton}
          buttonType="warning"
        />
      </ButtonWrapper>
    </ContentModal>
  </SimpleModal>
);

ModalFeedback.propTypes = {
  callbackFooterButton: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  height: PropTypes.string,
  iconName: PropTypes.string,
  textButton: PropTypes.string,
  width: PropTypes.string,
};

ModalFeedback.defaultProps = {
  callbackFooterButton: null,
  height: "250px",
  iconName: "success",
  textButton: "ok",
  width: "305px",
};

export default ModalFeedback;
