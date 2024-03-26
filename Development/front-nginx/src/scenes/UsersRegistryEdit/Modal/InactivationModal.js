import React from "react";
import { arrayOf, bool, func, shape, string } from "prop-types";

import { Loading } from "@base";
import { SvgIcon } from "@common";
import { buttonTypes } from "@enums";
import { If } from "@utils";

import { Select } from "src/modules/Form";

import {
  AlertText,
  AlertTextLogout,
  ButtonWrapper,
  DropdownLabel,
  LoadingWrapper,
  ModalContainer,
  ModalText,
  SelectWrapp,
  StyledButton,
} from "./Modals.styles";

export const InactivationModal = ({
  userName,
  userStatus,
  isSingleUser,
  checkLoggedUserIsUserSelect,
  dropdownValues,
  firstBtnText,
  secondBtnText,
  touched,
  errors,
  handleSubmit,
  closeModal,
  loading,
  checkSubGrupo,
}) => (
  <ModalContainer id="modal-inactivation">
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
      <If test={isSingleUser && checkLoggedUserIsUserSelect && !checkSubGrupo}>
        <ModalText>
          Para reativar seu acesso, precisará entrar em contato <br />
          com nosso atendimento:
        </ModalText>
        <AlertText>
          4004-4474 capitais e regiões metropolitanas, <br />
          0800-723-4474 para demais localidades. <br />
          <AlertTextLogout>
            Você será desconectado após confirmar a inativação
          </AlertTextLogout>
        </AlertText>
      </If>
      <If
        test={
          (!isSingleUser && checkLoggedUserIsUserSelect) ||
          (isSingleUser && checkLoggedUserIsUserSelect && checkSubGrupo)
        }
      >
        <ModalText>
          Ao se invativar, <br />
          não terá mais acesso ao Portal RH. <br />
          <AlertTextLogout>
            <b>Você será desconectado após confirmar a inativação</b>
          </AlertTextLogout>
        </ModalText>
      </If>
      <If
        test={
          (!isSingleUser && !checkLoggedUserIsUserSelect) ||
          (isSingleUser && !checkLoggedUserIsUserSelect && checkSubGrupo)
        }
      >
        <ModalText>
          Ao inativar <b> {userName} </b> <br />
          não terá mais acesso ao Portal RH. <br />
        </ModalText>
      </If>
      <SelectWrapp>
        <DropdownLabel>Selecione o motivo da inativação</DropdownLabel>
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
      <ButtonWrapper id="modal-inactivation">
        <StyledButton
          id="action_first_btn"
          buttonType={buttonTypes.light}
          value={firstBtnText}
          onClick={
            userStatus && isSingleUser && !checkSubGrupo
              ? handleSubmit
              : closeModal
          }
        />
        <StyledButton
          id="action_second_btn"
          buttonType={buttonTypes.primary}
          value={secondBtnText}
          onClick={
            userStatus && isSingleUser && !checkSubGrupo
              ? closeModal
              : handleSubmit
          }
        />
      </ButtonWrapper>
    </If>
  </ModalContainer>
);

InactivationModal.propTypes = {
  userName: string.isRequired,
  userStatus: bool.isRequired,
  isSingleUser: bool.isRequired,
  checkSubGrupo: bool.isRequired,
  checkLoggedUserIsUserSelect: bool.isRequired,
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

export default InactivationModal;
