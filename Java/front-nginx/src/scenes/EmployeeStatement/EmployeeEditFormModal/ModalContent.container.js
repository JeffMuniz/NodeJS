import React, { PureComponent } from "react";
import { shape, func } from "prop-types";
import { connect } from "react-redux";
import { requestStatus as statuses, employeeStatus } from "@enums";
import FormWrapper from "src/modules/Form/Form";
import * as employeeActions from "src/redux/modules/employee/actions/employee";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import FormSchema from "./FormContent/FormContent.schema";
import { Title, ModalTitle, ModalForm } from "./ModalContent.styles";
import FormContent from "./FormContent/FormContent";

export class ModalContent extends PureComponent {
  state = {
    requestStatus: statuses.none,
    errorMessage: "",
  };

  onSubmit = async formValues => {
    const {
      updateEmployee,
      getEmployeeRegistry,
      closeModal,
      entity: { cpf, idCompany: companyId, status },
    } = this.props;
    try {
      this.setState({ requestStatus: statuses.loading, errorMessage: "" });
      await updateEmployee(formValues);
      await getEmployeeRegistry({
        cpf,
        companyId,
        employeeStatus: employeeStatus[status.toLowerCase()],
      });
      closeModal();
      this.successfullToast();
    } catch (err) {
      this.setState({
        requestStatus: statuses.error,
        errorMessage: err.message,
      });
    }
  };

  successfullToast = () => {
    const { showToast } = this.props;
    return showToast({
      id: "success_toast_message",
      label: `Dados cadastrais do funcionário alterados com sucesso!`,
    });
  };

  render() {
    const { entity, closeModal } = this.props;
    const { requestStatus, errorMessage } = this.state;
    return (
      <div>
        <ModalTitle>
          <Title>Editar Funcionário</Title>
        </ModalTitle>
        <ModalForm>
          <FormWrapper
            initialValues={entity}
            onSubmit={this.onSubmit}
            validationSchema={FormSchema}
            render={props => (
              <FormContent
                {...props}
                requestStatus={requestStatus}
                hasError={requestStatus === statuses.error}
                isLoading={requestStatus === statuses.loading}
                errorMessage={errorMessage}
                closeModal={closeModal}
              />
            )}
          />
        </ModalForm>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateEmployee: employeeActions.updateEmployee,
  closeModal: modalActions.CloseModal,
  getEmployeeRegistry: employeeActions.getEmployeeRegistry,
  showToast: showToastAction,
};

ModalContent.propTypes = {
  entity: shape({}).isRequired,
  updateEmployee: func.isRequired,
  getEmployeeRegistry: func.isRequired,
  closeModal: func.isRequired,
  showToast: func.isRequired,
};

export default connect(null, mapDispatchToProps)(ModalContent);
