import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { func, string } from "prop-types";

import { CloseModal } from "src/redux/modules/modal/actions/modal";
import { showToast } from "src/common/Toast/redux/actions/toast";
import reportActions from "src/redux/modules/reports/actions";
import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";
import requestStatusEnum from "src/enums/requestStatus.enum";
import CreateReport from "./CreateReport";

class CreateReportContainer extends PureComponent {
  state = {
    startDate: null,
    endDate: null,
  };

  onSubmit = async () => {
    const {
      createReport,
      closeModal,
      sendToastMessage,
      onCreateReport,
    } = this.props;

    const { startDate: stateStartDate, endDate: stateEndDate } = this.state;

    const startDate = DateManager(stateStartDate).format(
      dateHourFormats.longDateUS,
    );
    const endDate = stateEndDate
      ? DateManager(stateEndDate).format(dateHourFormats.longDateUS)
      : startDate;

    try {
      await createReport({ startDate, endDate });

      onCreateReport();
      closeModal();
      sendToastMessage({
        id: "feeback-success-create-report",
        label:
          "Relatório gerado com sucesso! Aguarde a conclusão do processamento",
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  onDateChange = ({ startDate, endDate }) =>
    this.setState({ startDate, endDate });

  render = () => {
    const { closeModal, requestStatus } = this.props;
    const { startDate } = this.state;

    return (
      <CreateReport
        onDateChange={this.onDateChange}
        startDate={startDate}
        maxRange={{ period: "days", value: 90 }}
        onCloseModal={closeModal}
        isLoading={requestStatus === requestStatusEnum.loading}
        onSubmit={this.onSubmit}
      />
    );
  };
}

CreateReportContainer.propTypes = {
  requestStatus: string.isRequired,
  createReport: func.isRequired,
  onCreateReport: func.isRequired,
  sendToastMessage: func.isRequired,
  closeModal: func.isRequired,
};

const mapStateToProps = ({ reports: { requestStatus } }) => ({
  requestStatus,
});

const mapDispatchToProps = {
  sendToastMessage: showToast,
  createReport: reportActions.createReport,
  closeModal: CloseModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateReportContainer);
