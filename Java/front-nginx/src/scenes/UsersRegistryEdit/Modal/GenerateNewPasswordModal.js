import React from "react";
import { bool, func, string } from "prop-types";

import { Loading } from "@base";
import { SvgIcon } from "@common";
import { buttonTypes } from "@enums";
import { If } from "@utils";

import {
  ButtonWrapper,
  LoadingWrapper,
  ModalContainer,
  ModalText,
  StyledButton,
} from "./Modals.styles";

export const GenerateNewPasswordModal = ({
  userName,
  closeModal,
  handleSubmit,
  loading,
}) => (
  <ModalContainer>
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <SvgIcon
        id="svg_icon_image_inactivation_modal"
        name="warning"
        size={65}
      />
      <ModalText>
        Você reativou o acesso de <br />
        <br />
        <b>{userName}</b> <br />
        <br />
        gostaria de gerar uma nova senha de <br />
        acesso para essa pessoa?
      </ModalText>
      <ButtonWrapper>
        <StyledButton
          id="action_first_btn"
          buttonType={buttonTypes.light}
          value="Gerar nova senha"
          onClick={handleSubmit}
        />
        <StyledButton
          id="action_second_btn"
          buttonType={buttonTypes.primary}
          value="Não"
          onClick={() => closeModal(userName)}
        />
      </ButtonWrapper>
    </If>
  </ModalContainer>
);

GenerateNewPasswordModal.propTypes = {
  userName: string.isRequired,
  handleSubmit: func.isRequired,
  closeModal: func.isRequired,
  loading: bool.isRequired,
};

export default GenerateNewPasswordModal;
