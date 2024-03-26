import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { shape, func } from "prop-types";
import { connect } from "react-redux";
import {
  requestStatus as statuses,
  activateStatus,
  inactivateStatus,
} from "@enums";

import { Routes, WebPaths } from "src/routes/consts";

import * as modalActions from "src/redux/modules/modal/actions/modal";
import { updateEmployeesStatus } from "src/api/employee/employee";
import { toStatusApi } from "src/api/dtos/employee.dto";

import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import { Select } from "@common";

import {
  Title,
  ModalTitle,
  ModalForm,
  SubTitle,
  BottomWrapper,
  ActionButton,
  SubmitButtonCol,
  Info,
  SelectWrapp,
  InputTitle,
  InputError,
} from "./EmployeeStatusModal.styles";

export class EmployeeStatusModal extends Component {
  state = {
    requestStatus: statuses.none,
    errorMessage: "",
    reason: "",
  };

  getReasons = active => (active ? inactivateStatus : activateStatus);

  handleSubmit = async () => {
    const {
      closeModal,
      entity,
      userData,
      history: { push },
    } = this.props;
    const { reason } = this.state;

    const body = {
      id: parseInt(userData.id, 10),
      funcionarios: [toStatusApi(entity, reason.name)],
    };

    try {
      this.setState({ requestStatus: statuses.loading, errorMessage: "" });
      await updateEmployeesStatus(
        body,
        entity.status === "ativo" ? "inativar" : "ativar",
      );

      this.successfullToast(entity.status === "ativo" ? "in" : "");

      closeModal();

      push(WebPaths[Routes.EMPLOYEES]);
    } catch (err) {
      this.setState({
        requestStatus: statuses.error,
        errorMessage:
          err.message || "Ocorreu um erro, tente novamente mais tarde.",
      });
    }
  };

  handleReasonChange = reason => this.setState({ reason });

  successfullToast = type => {
    const { showToast } = this.props;
    return showToast({
      id: "success_toast_message",
      label: `Funcionário ${type}ativado com sucesso!`,
    });
  };

  render() {
    const { entity, closeModal } = this.props;
    const { reason } = this.state;
    const { requestStatus, errorMessage } = this.state;

    const active = entity.status.toLowerCase() === "ativo";
    const statusText = !active ? "ativação" : "inativação";
    const optionsReason = this.getReasons(active);

    return (
      <div>
        <ModalTitle>
          <Title> Confirmação da {statusText} </Title>
          <SubTitle>
            Verifique os dados abaixo para realizar a {statusText}
          </SubTitle>
        </ModalTitle>
        <ModalForm>
          <SelectWrapp>
            <InputTitle>Selecione o motivo</InputTitle>
            <Select
              placeholder="Selecione o motivo"
              values={optionsReason}
              onValueChange={this.handleReasonChange}
            />
          </SelectWrapp>
          <Info>
            A partir do momento que você confirmar a {statusText}, esse
            funcionário {!active ? " voltará a " : " deixará de "} receber a(s)
            carga(s) em seu(s) cartão(s) novamente.
          </Info>
          {errorMessage && <InputError>{errorMessage}</InputError>}
          <BottomWrapper>
            <ActionButton
              id="btn_cancel"
              type="button"
              onPress={closeModal}
              buttonType="light"
              value="CANCELAR"
            />
            <SubmitButtonCol>
              <ActionButton
                id="btn_submit"
                type="button"
                disabled={!reason}
                onPress={this.handleSubmit}
                value={
                  entity.status.toLowerCase() === "ativo"
                    ? "Inativar"
                    : "Ativar"
                }
                loading={requestStatus === "loading"}
              />
            </SubmitButtonCol>
          </BottomWrapper>
        </ModalForm>
      </div>
    );
  }
}

const mapDispatchToProps = {
  closeModal: modalActions.CloseModal,
  showToast: showToastAction,
};

const mapStateToProps = ({
  user: {
    profile: { data },
  },
}) => ({
  userData: data,
});

EmployeeStatusModal.defaultProps = {
  userData: {},
  showToast: () => null,
};

EmployeeStatusModal.propTypes = {
  entity: shape({}).isRequired,
  closeModal: func.isRequired,
  showToast: func,
  userData: shape({}),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeStatusModal),
);
