import React, { Component } from "react";
import { func, string } from "prop-types";
import { connect } from "react-redux";

import * as orderActions from "src/redux/modules/order/actions";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import { cancelOrder } from "src/api/order/order";

import CancelOrderComponent from "./CancelOrder";

class CancelOrderContainer extends Component {
  state = {
    loading: false,
  };

  handleCancelOrder = async () => {
    const { orderId, callbackSuccess, showToast } = this.props;

    this.setState({ loading: true });

    cancelOrder({
      orderId,
      onSuccess: () => {
        showToast({
          id: "cancel_toast_message",
          label: `Pedido ${orderId} cancelado com sucesso!`,
        });

        this.setState({ loading: false });

        callbackSuccess();
      },
      onError: sendingError => {
        this.setState({ loading: false });

        showToast({
          id: "cancel_toast_message_error",
          label: sendingError,
        });
      },
    });
  };

  render() {
    const { error, handleCloseModalCancelOrder } = this.props;
    const { loading } = this.state;

    return (
      <CancelOrderComponent
        submitCancelOrder={this.handleCancelOrder}
        closeModal={handleCloseModalCancelOrder}
        requestError={error}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = ({
  order: {
    cancel: { orderToCancel: orderId, error: cancelError },
  },
  selectedCompanyTree,
}) => ({
  orderId,
  error: cancelError,
  selectedGroup: selectedCompanyTree.selectedGroup,
});

const mapDispatchToProps = {
  cancelOrder: orderActions.cancelOrder,
  closeModal: modalActions.CloseModal,
  unsetOrderToCancel: orderActions.unsetOrderToCancel,
  getOrders: orderActions.getOrders,
  resetCancelState: orderActions.resetCancelState,
  showToast: showToastAction,
};

CancelOrderContainer.propTypes = {
  callbackSuccess: func.isRequired,
  handleCloseModalCancelOrder: func.isRequired,
  orderId: string.isRequired,
  error: string,
  showToast: func,
};

CancelOrderContainer.defaultProps = {
  error: "",
  showToast: () => null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CancelOrderContainer);
