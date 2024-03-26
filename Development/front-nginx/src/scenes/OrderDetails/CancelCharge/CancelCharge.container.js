import React, { Component } from "react";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";

import * as orderActions from "src/redux/modules/order/actions";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import CancelChargeComponent from "./CancelCharge";

class CancelChargeContainer extends Component {
  state = {
    loading: false,
  };

  handleCancelCharge = async () => {
    const {
      orderId,
      chargeId,
      handleClickConfirmCancelCharge,
      showToast,
    } = this.props;
    this.setState({ loading: true });

    await handleClickConfirmCancelCharge({ orderId });
    showToast({
      id: "cancel_toast_message",
      label: `Carga ${chargeId} cancelado com sucesso!`,
    });

    this.setState({ loading: false });
  };

  render() {
    const { error, handleCloseModalCancelCharge } = this.props;
    const { loading } = this.state;

    return (
      <CancelChargeComponent
        submitCancelCharge={this.handleCancelCharge}
        closeModal={handleCloseModalCancelCharge}
        requestError={error}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = ({ order: { cancelCharge }, selectedCompanyTree }) => ({
  orderId: cancelCharge.chargeToCancel.orderId,
  chargeId: cancelCharge.chargeToCancel.chargeId,
  error: cancelCharge.error,
  selectedGroup: selectedCompanyTree.selectedGroup,
});

const mapDispatchToProps = {
  resetCancelState: orderActions.resetCancelState,
  showToast: showToastAction,
};

CancelChargeContainer.propTypes = {
  handleClickConfirmCancelCharge: func.isRequired,
  handleCloseModalCancelCharge: func.isRequired,
  orderId: string.isRequired,
  chargeId: string.isRequired,
  error: shape({ message: string }),
  showToast: func,
};

CancelChargeContainer.defaultProps = {
  error: {},
  showToast: () => null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CancelChargeContainer);
