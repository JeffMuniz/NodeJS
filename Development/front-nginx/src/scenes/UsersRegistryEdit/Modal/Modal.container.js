import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { bool, func, number, string } from "prop-types";

import FormWrapper from "src/modules/Form/Form";
import { WebPaths, Routes } from "src/routes/consts";
import { setUpdateUserStatus as setUpdateUserStatusAction } from "src/redux/modules/user/actions/setUpdateUserStatus";
import { resetAuth as resetAuthAction } from "src/redux/modules/session/actions/session";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import {
  OpenModal as openModalAction,
  CloseModal as closeModalAction,
} from "src/redux/modules/modal/actions/modal";
import * as userActions from "src/redux/modules/user/actions/userActions";
import * as SessionActions from "src/redux/modules/session/actions/session";

import ActivationModal from "./ActivationModal";
import InactivationModal from "./InactivationModal";
import GenerateNewPasswordModal from "./GenerateNewPasswordModal";
import formSchema from "./Modal.schema";

const dropdownValuesInactivateUser = [
  { key: "DESLIGAMENTO", value: "DESLIGAMENTO", label: "Desligamento" },
  { key: "FRAUDE", value: "FRAUDE", label: "Fraude" },
  { key: "MUDANCA_AREA", value: "MUDANCA_AREA", label: "Mudança de área" },
  { key: "OBITO", value: "OBITO", label: "Óbito" },
  { key: "OUTROS", value: "OUTROS", label: "Outros" },
];

const dropdownValuesActivateUser = [
  { key: "MUDANCA_AREA", value: "MUDANCA_AREA", label: "Mudança de área" },
  { key: "RECONTRATACAO", value: "RECONTRATACAO", label: "Recontratação" },
  { key: "OUTROS", value: "OUTROS", label: "Outros" },
];

export class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleGenerateNewPassword = async () => {
    const {
      userName,
      cpf,
      email,
      getCode,
      forgotPasswordAction,
      showToast,
      closeModal,
    } = this.props;

    try {
      showToast({
        id: "toast_user_update_active_status_success",
        label: `${userName} teve o acesso reativado no Portal RH. Em instantes irá receber um e-mail de confirmação.`,
      });

      closeModal();

      await Promise.all([
        await getCode(),
        await forgotPasswordAction({ cpf, email }),
      ]);
    } catch (error) {
      showToast({
        id: "toast_user_update_active_status_success",
        label:
          "Ocorreu um erro ao enviar o e-mail para a geração da nova senha.",
      });
    }
  };

  handleCloseModal = userName => {
    const { closeModal, showToast } = this.props;

    showToast({
      id: "toast_user_update_active_status_success",
      label: `${userName} teve o acesso reativado no Portal RH.`,
    });

    closeModal();
  };

  handleOpenModalGenerateNewPassword = () => {
    const { openModal, userName } = this.props;

    const { loading } = this.state;

    openModal({
      children: (
        <GenerateNewPasswordModal
          userName={userName}
          closeModal={this.handleCloseModal}
          handleSubmit={this.handleGenerateNewPassword}
          loading={loading}
        />
      ),
    });
  };

  handleLogout = () => {
    const {
      resetAuth,
      history: { push },
    } = this.props;

    resetAuth();

    push(WebPaths[Routes.LOGIN]);
  };

  handleUpdateUserStatus = async reason => {
    const {
      userId,
      userName,
      userStatus,
      selectedGroupId,
      selectedSubGroupId,
      loggedUserId,
      isSingleUser,
      setUpdateUserStatus,
      showToast,
      onCloseModal,
      handleChangeStatus,
    } = this.props;
    const checkLoggedUserIsUserSelect = userId === loggedUserId;

    this.setState({ loading: true });

    try {
      await setUpdateUserStatus({
        userId,
        status: !userStatus,
        selectedReason: reason,
        selectedGroupId,
        selectedSubGroupId,
        loggedUserId,
      });

      this.setState({ loading: false });

      onCloseModal();
      handleChangeStatus(!userStatus, isSingleUser);

      if (userStatus) {
        if (checkLoggedUserIsUserSelect) this.handleLogout();
        showToast({
          id: "toast_user_update_inactive_status_success",
          label: `${userName} foi inativado do Portal RH`,
        });
      } else {
        this.handleOpenModalGenerateNewPassword();
      }
    } catch (err) {
      this.setState({ loading: false });

      showToast({
        id: "toast_user_update_status_error",
        label: "Ocorreu um erro ao tentar realizar sua solicitação",
      });
    }
  };

  render() {
    const { loading } = this.state;
    const {
      userName,
      userStatus,
      isSingleUser,
      onCloseModal,
      userId,
      loggedUserId,
      selectedSubGroupId,
    } = this.props;
    const checkLoggedUserIsUserSelect = userId === loggedUserId;
    const checkSubGrupo = !!selectedSubGroupId;

    return (
      <FormWrapper
        validationSchema={formSchema}
        onSubmit={({ reason }) => {
          this.handleUpdateUserStatus(reason);
        }}
      >
        {props =>
          userStatus ? (
            <InactivationModal
              userName={userName}
              userStatus={userStatus}
              isSingleUser={isSingleUser}
              checkLoggedUserIsUserSelect={checkLoggedUserIsUserSelect}
              dropdownValues={dropdownValuesInactivateUser}
              checkSubGrupo={checkSubGrupo}
              firstBtnText={
                isSingleUser && !checkSubGrupo ? "Inativar" : "Cancelar"
              }
              secondBtnText={
                isSingleUser && !checkSubGrupo ? "Cancelar" : "Inativar"
              }
              closeModal={onCloseModal}
              loading={loading}
              {...props}
            />
          ) : (
            <ActivationModal
              userName={userName}
              dropdownValues={dropdownValuesActivateUser}
              firstBtnText="Cancelar"
              secondBtnText="Reativar"
              closeModal={onCloseModal}
              loading={loading}
              {...props}
            />
          )
        }
      </FormWrapper>
    );
  }
}

ModalContainer.propTypes = {
  userId: string.isRequired,
  resetAuth: func.isRequired,
  userName: string.isRequired,
  userStatus: bool.isRequired,
  cpf: string.isRequired,
  email: string.isRequired,
  isSingleUser: bool.isRequired,
  selectedGroupId: number.isRequired,
  selectedSubGroupId: string,
  loggedUserId: string.isRequired,
  onCloseModal: func.isRequired,
  setUpdateUserStatus: func.isRequired,
  showToast: func.isRequired,
  handleChangeStatus: func.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  forgotPasswordAction: func.isRequired,
  getCode: func.isRequired,
};

ModalContainer.defaultProps = {
  selectedSubGroupId: null,
};

const mapDispatchToProps = {
  openModal: openModalAction,
  closeModal: closeModalAction,
  setUpdateUserStatus: setUpdateUserStatusAction,
  showToast: showToastAction,
  forgotPasswordAction: userActions.forgotPassword,
  getCode: SessionActions.getCode,
  resetAuth: resetAuthAction,
};

export default connect(null, mapDispatchToProps)(withRouter(ModalContainer));
