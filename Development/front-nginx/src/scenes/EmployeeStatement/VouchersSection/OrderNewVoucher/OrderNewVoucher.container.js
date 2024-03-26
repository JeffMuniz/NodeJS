import React, { Component } from "react";
import { shape, string, func } from "prop-types";
import { connect } from "react-redux";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import * as voucherActions from "src/redux/modules/voucher/actions/voucherActions";
import { requestStatus } from "@enums";

import OrderNewVoucher from "./OrderNewVoucher";

class OrderNewVoucherContainer extends Component {
  componentDidMount() {
    const { resetNewVoucher } = this.props;

    resetNewVoucher();
  }

  componentDidUpdate() {
    const {
      newVoucher: { requestStatus: newVoucherRequestStatus },
      updateVouchers,
      showToast,
      resetNewVoucher,
    } = this.props;

    if (newVoucherRequestStatus === requestStatus.success) {
      updateVouchers();
      showToast({
        id: "order_new_voucher_success",
        label: "Novo cartão solicitado com sucesso!",
      });
      resetNewVoucher();
    }
  }

  handleSubmitNewVoucher = async reason => {
    const {
      orderNewVoucher,
      voucher: { id },
      toggleModal,
    } = this.props;

    await orderNewVoucher({
      id,
      reasonId: reason,
    });
    toggleModal();
  };

  render() {
    const { voucher, newVoucher, toggleModal } = this.props;
    return (
      <OrderNewVoucher
        onSubmitNewVoucher={this.handleSubmitNewVoucher}
        closeModal={toggleModal}
        error={
          newVoucher.requestStatus === requestStatus.error && newVoucher.error
        }
        voucher={voucher}
        isLoading={newVoucher.requestStatus === requestStatus.loading}
      />
    );
  }
}

OrderNewVoucherContainer.propTypes = {
  voucher: shape({
    id: string.isRequired,
    printedName: string.isRequired,
    idProduct: string.isRequired,
  }).isRequired,
  toggleModal: func.isRequired,
  orderNewVoucher: func.isRequired,
  resetNewVoucher: func.isRequired,
  showToast: func.isRequired,
  newVoucher: shape({
    requestStatus: string,
  }),
  updateVouchers: func.isRequired,
};

OrderNewVoucherContainer.defaultProps = {
  newVoucher: {},
};

export const mapStateToProps = ({ voucher: { newVoucher } }) => ({
  newVoucher,
});

const mapDispatchToProps = {
  orderNewVoucher: voucherActions.orderNewVoucher,
  showToast: showToastAction,
  resetNewVoucher: voucherActions.resetNewVoucher,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderNewVoucherContainer);
