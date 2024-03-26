import React, { Component } from "react";
import { string, func, shape } from "prop-types";
import { connect } from "react-redux";
import DateManager from "src/modules/DateManager/DateManager";
import * as VoucherActions from "src/redux/modules/voucher/actions/voucherActions";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import { requestStatus, dateHourFormats } from "@enums";

import TemporaryBlock from "./TemporaryBlock";

const ONE_MONTH = "ONE_MONTH";
const CUSTOM = "CUSTOM";

class TemporaryBlockContainer extends Component {
  state = {
    isDatepickerOpen: false,
    selectedDate: "",
    uptillDate: {},
  };

  componentDidUpdate() {
    const {
      temporaryBlock,
      updateVouchers,
      showToast,
      resetTemporaryBlock,
    } = this.props;

    if (temporaryBlock.requestStatus === requestStatus.success) {
      updateVouchers();
      showToast({
        id: "temporary_block_success",
        label: "Bloqueio de cartão efetuado com sucesso!",
      });
      resetTemporaryBlock();
    }
  }

  onSetCustomPeriod = ({ date }) => {
    this.setState({
      isDatepickerOpen: false,
      selectedDate: date.format(dateHourFormats.longDateSlash),
      uptillDate: {
        id: CUSTOM,
        finalDate: date.format(dateHourFormats.longDateUS),
      },
    });
  };

  onCloseDatePicker = () => this.setState({ isDatepickerOpen: false });

  onOpenDatePicker = () => {
    this.setState({
      isDatepickerOpen: true,
    });
  };

  handleDateChange = value => {
    const { uptillDate } = this.state;
    if (uptillDate.id === value.id && value.id !== CUSTOM) {
      return this.setState({
        uptillDate: {},
        selectedDate: undefined,
      });
    }

    let finalDate = "";

    if (value.id === ONE_MONTH)
      finalDate = DateManager()
        .add(30, "days")
        .format(dateHourFormats.longDateUS);

    return this.setState({
      uptillDate: { ...value, finalDate },
      selectedDate: undefined,
    });
  };

  handleSubmit = () => async () => {
    const { uptillDate } = this.state;
    const { toggleModal } = this.props;
    if (!uptillDate || !uptillDate.id) return;

    await this.handleBlockSubmit(uptillDate.finalDate);

    this.setState(
      {
        isDatepickerOpen: false,
        selectedDate: "",
        uptillDate: {},
      },
      toggleModal(),
    );
  };

  handleBlockSubmit = upTillDate => {
    const { blockVoucher, voucherId } = this.props;
    return blockVoucher({ voucherId, upTillDate });
  };

  toggleModal = () => {
    const { resetTemporaryBlock, toggleModal } = this.props;

    resetTemporaryBlock();
    return this.setState(
      {
        isDatepickerOpen: false,
        selectedDate: "",
        uptillDate: {},
      },
      toggleModal(),
    );
  };

  render() {
    const { temporaryBlock } = this.props;
    const { isDatepickerOpen, selectedDate, uptillDate } = this.state;

    return (
      <TemporaryBlock
        onSubmitBlock={this.handleBlockSubmit}
        closeModal={this.toggleModal}
        datepickerOpen={isDatepickerOpen}
        onCloseDatePicker={this.onCloseDatePicker}
        selectedDate={selectedDate}
        onOpenDatePicker={this.onOpenDatePicker}
        onSetCustomPeriod={this.onSetCustomPeriod}
        uptillDate={uptillDate}
        handleDateChange={this.handleDateChange}
        handleSubmit={this.handleSubmit}
        error={
          temporaryBlock.requestStatus === requestStatus.error &&
          temporaryBlock.error
        }
        isLoading={temporaryBlock.requestStatus === requestStatus.loading}
      />
    );
  }
}

TemporaryBlockContainer.propTypes = {
  toggleModal: func.isRequired,
  voucherId: string.isRequired,
  blockVoucher: func.isRequired,
  temporaryBlock: shape({
    requestStatus: string,
    error: string,
  }),
  resetTemporaryBlock: func.isRequired,
  showToast: func.isRequired,
  updateVouchers: func.isRequired,
};

TemporaryBlockContainer.defaultProps = {
  temporaryBlock: {},
};

export const mapStateToProps = ({ voucher: { temporaryBlock } }) => ({
  temporaryBlock,
});

const mapDispatchToProps = {
  blockVoucher: VoucherActions.blockVoucher,
  resetTemporaryBlock: VoucherActions.resetTemporaryBlock,
  showToast: showToastAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemporaryBlockContainer);
