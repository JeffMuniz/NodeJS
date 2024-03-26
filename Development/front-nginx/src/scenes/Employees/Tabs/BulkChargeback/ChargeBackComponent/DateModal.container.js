import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { func, bool } from "prop-types";

import { CloseModal } from "src/redux/modules/modal/actions/modal";
import { showToast } from "src/common/Toast/redux/actions/toast";
import reportActions from "src/redux/modules/reports/actions";
import { requestStatus as requestStatusEnum } from "@enums";
import DateModal from "./DateModal";

class DateModalContainer extends PureComponent {
  state = {
    startDate: null,
    endDate: null,
  };

  onSubmit = async () => {
    const { onSubmit, changeParentDate } = this.props;
    const { startDate, endDate } = this.state;
    changeParentDate({ startDate, endDate });
    onSubmit({ startDate, endDate });
  };

  onDateChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onCloseModal = () => {
    const { closeModal } = this.props;
    this.onDateChange({ startDate: null, endDate: null });
    closeModal();
  };

  render = () => {
    const { requestStatus } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <DateModal
        onDateChange={this.onDateChange}
        startDate={startDate}
        endDate={endDate}
        maxRange={{ period: "days", value: 30 }}
        onCloseModal={this.onCloseModal}
        isLoading={requestStatus === requestStatusEnum.loading}
        onSubmit={this.onSubmit}
      />
    );
  };
}

DateModalContainer.propTypes = {
  onSubmit: func.isRequired,
  changeParentDate: func.isRequired,
  requestStatus: bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(DateModalContainer);
