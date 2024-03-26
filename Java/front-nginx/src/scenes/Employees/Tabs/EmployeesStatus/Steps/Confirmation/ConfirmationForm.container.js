import React, { PureComponent, Fragment } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import { connect } from "react-redux";

import { Loading } from "@base";
import { If } from "@utils";

import FormWrapper from "src/modules/Form/Form";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import { getUserAccessLevel as getUserAccessLevelAction } from "src/redux/modules/user/actions/getAccessLevel";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import { updateEmployeesStatus } from "src/api/employee/employee";
import { FormattedEmployees, toStatusApi } from "src/api/dtos/employee.dto";

import ConfirmationForm from "./ConfirmationForm";
import ConfirmationModal from "./ConfirmationModal";

import { LoadingWrapper } from "./ConfirmationForm.styled";

export class ConfirmationFormContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidUpdate = prevProps => {
    const {
      selectedCompany: { id: companyId },
      goBackDetails,
    } = this.props;
    const {
      selectedCompany: { id: prevCompanyId },
    } = prevProps;

    companyId !== prevCompanyId && goBackDetails();
  };

  toggleLoading = () => this.setState(({ loading }) => ({ loading: !loading }));

  handleSubmitModal = async values => {
    const {
      closeModal,
      goBackDetails,
      loggedUserId,
      selectedStatusRequest,
      showToast,
    } = this.props;

    this.toggleLoading();

    const [{ reason }] = values;

    const body = {
      id: parseInt(loggedUserId, 10),
      funcionarios: values.map(el => toStatusApi(el, reason)),
    };

    try {
      await updateEmployeesStatus(body, selectedStatusRequest);

      this.toggleLoading();

      showToast({
        id: "success_toast_message_change_status_employee",
        label: `Os funcionários foram ${
          selectedStatusRequest === "ativar" ? "ativados" : "inativados"
        } com sucesso!`,
      });

      closeModal();
      goBackDetails();
    } catch (err) {
      this.toggleLoading();

      showToast({
        id: "error_toast_message_change_status_employee",
        label:
          err.message ||
          `Ocorreu um erro ao ${
            selectedStatusRequest === "ativar" ? "ativar" : "inativar"
          } os funcionários!`,
      });
    }
  };

  handleSubmitForm = ({ cpfs }) => {
    const { openModal, closeModal } = this.props;

    return openModal({
      children: (
        <ConfirmationModal
          closeModal={closeModal}
          values={cpfs}
          handleSubmitModal={this.handleSubmitModal}
        />
      ),
    });
  };

  render() {
    const {
      // chargeback: { data },
      goBack,
      selectedStatusRequest,
      validCpfs,
    } = this.props;
    const { loading } = this.state;

    const details = FormattedEmployees(validCpfs);

    return (
      <FormWrapper
        initialValues={{ cpfs: details }}
        onSubmit={this.handleSubmitForm}
        enableReinitialize
      >
        {props => (
          <Fragment>
            <If test={loading}>
              <LoadingWrapper>
                <Loading loading />
              </LoadingWrapper>
            </If>
            <ConfirmationForm
              {...props}
              {...this.props}
              goBack={goBack}
              selectedStatusRequest={selectedStatusRequest}
            />
          </Fragment>
        )}
      </FormWrapper>
    );
  }
}

const mapStateToProps = ({
  employee: { chargeback },
  selectedCompanyTree: { selectedCompany },
  user: {
    profile: {
      data: { id: loggedUserId },
    },
  },
}) => ({ chargeback, selectedCompany, loggedUserId });

export const mapDispatchToProps = {
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
  getUserAccessLevel: getUserAccessLevelAction,
  showToast: showToastAction,
};

ConfirmationFormContainer.propTypes = {
  goBack: func.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  chargeback: shape({}).isRequired,
  goBackDetails: func.isRequired,
  loggedUserId: string.isRequired,
  selectedCompany: shape({}).isRequired,
  selectedStatusRequest: string.isRequired,
  showToast: func,
  validCpfs: arrayOf(shape({})).isRequired,
};

ConfirmationFormContainer.defaultProps = {
  showToast: () => null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationFormContainer);
