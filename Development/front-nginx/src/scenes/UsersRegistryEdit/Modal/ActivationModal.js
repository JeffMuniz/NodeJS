import React from "react";
import { arrayOf, bool, func, shape, string } from "prop-types";

import { Loading } from "@base";
import { buttonTypes } from "@enums";
import { If } from "@utils";

import { Select } from "src/modules/Form";

import {
  ButtonWrapper,
  DropdownLabel,
  LoadingWrapper,
  ModalContainer,
  ModalText,
  SelectWrapp,
  StyledButton,
} from "./Modals.styles";

export const ActivationModal = ({
  userName,
  dropdownValues,
  firstBtnText,
  secondBtnText,
  touched,
  errors,
  handleSubmit,
  closeModal,
  loading,
}) => (
  <ModalContainer>
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <ModalText>
        Você está reativando o acesso ao Portal RH <br />
        de <b>{userName}</b>
      </ModalText>
      <SelectWrapp>
        <DropdownLabel>Selecione o motivo da reativação</DropdownLabel>
        <Select
          id="chargeback_reason"
          name="reason"
          placeholder="Escolha..."
          options={dropdownValues}
          width="290px"
          touched={touched}
          errors={errors}
          {...this.props}
        />
      </SelectWrapp>
      <ButtonWrapper>
        <StyledButton
          id="action_first_btn"
          buttonType={buttonTypes.light}
          value={firstBtnText}
          onClick={closeModal}
        />
        <StyledButton
          id="action_second_btn"
          buttonType={buttonTypes.primary}
          value={secondBtnText}
          onClick={handleSubmit}
        />
      </ButtonWrapper>
    </If>
  </ModalContainer>
);

ActivationModal.propTypes = {
  userName: string.isRequired,
  dropdownValues: arrayOf(
    shape({
      key: string,
      description: string,
    }),
  ).isRequired,
  firstBtnText: string.isRequired,
  secondBtnText: string.isRequired,
  touched: shape({}).isRequired,
  errors: shape({}).isRequired,
  handleSubmit: func.isRequired,
  closeModal: func.isRequired,
  loading: bool.isRequired,
};

export default ActivationModal;
