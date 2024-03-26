import React from "react";
import { func, string } from "prop-types";

import { Separator } from "@base";
import { SvgIcon } from "@common";
import { inputPlaceholder } from "@colors";

import {
  ModalWrapper,
  WarningIcon,
  Message,
  CompanyName,
  ButtonWrapper,
  StyledButton,
} from "./AccessFormModal.styles";

export const AccessFormModal = ({
  companyName,
  handleCloseModal,
  handleRemoveSuggestion,
}) => (
  <ModalWrapper id="access_form_modal">
    <WarningIcon id="access_form_icon">
      <SvgIcon name="warning" size={85} fill={inputPlaceholder} />
    </WarningIcon>
    <Message id="access_form_message">
      Tem certeza que deseja remover o acesso do usuário a essa matriz?
    </Message>
    <CompanyName id="access_form_company_name">{companyName}</CompanyName>
    <Separator />
    <ButtonWrapper>
      <StyledButton
        onPress={handleCloseModal}
        buttonType="actionButton"
        value="cancelar"
        id="access_form_cancel_button"
      />
      <StyledButton
        onPress={handleRemoveSuggestion}
        buttonType="primary"
        value="remover"
        id="access_form_confirm_button"
      />
    </ButtonWrapper>
  </ModalWrapper>
);

AccessFormModal.propTypes = {
  companyName: string,
  handleCloseModal: func.isRequired,
  handleRemoveSuggestion: func.isRequired,
};

AccessFormModal.defaultProps = {
  companyName: "",
};

export default AccessFormModal;
