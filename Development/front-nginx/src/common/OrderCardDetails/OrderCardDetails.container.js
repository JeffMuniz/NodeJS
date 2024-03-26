import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { string, shape, func, bool, number } from "prop-types";

import * as modalActions from "src/redux/modules/modal/actions/modal";
import * as orderActions from "src/redux/modules/order/actions";
import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";
import {
  orderStatus as orderStatusEnum,
  paymentStatus as paymentStatusEnum,
} from "@enums";
import TaxesSummary from "src/scenes/TaxesSummary";

import OrderCardDetails from "./OrderCardDetails";
import CancelOrder from "../CancelOrder/CancelOrder.container";

const CANCEL_ORDER_BUTTON_LABEL = "Cancelar Pedido";
class OrderCardDetailsContainer extends Component {
  constructor(props) {
    super(props);
    const { index } = this.props;
    this.state = {
      toggleButton: false,
      toggleDocs: false,
      showTaxesSummaryModal: false,
    };

    this.modalId = `cancel_order_modal_${index}`;
    this.triggerRef = React.createRef();
  }

  getOrderStatus = ({ status: orderStatus, canCancel } = {}) => {
    const status = orderStatusEnum[orderStatus];
    const disableCancel =
      status &&
      Object.hasOwnProperty.call(status, "buttonText") &&
      status.buttonText === CANCEL_ORDER_BUTTON_LABEL &&
      !canCancel;

    if (disableCancel) {
      return { ...status, hasAction: false };
    }

    return status || {};
  };

  getPaymentStatus = ({ paymentStatus } = {}) =>
    paymentStatusEnum[paymentStatus];

  toggleButton = e => {
    const { toggleButton } = this.state;
    e.stopPropagation();
    this.setState({ toggleButton: !toggleButton });
  };

  handleChangeDropdownVisibility = () => {
    const { toggleDocs } = this.state;
    this.setState({ toggleDocs: !toggleDocs });
  };

  handleClickErrors = orderId => () => {
    const { navigator } = this.props;
    navigate(navigator, { route: Routes.ORDER_ERRORS, params: { orderId } });
  };

  handleClickCancel = orderId => () => {
    const { setOrderToCancel, openModal } = this.props;

    setOrderToCancel({ orderId });
    openModal({
      customCloseModal: this.handleCloseModalCancelOrder,
      children: (
        <CancelOrder
          callbackSuccess={this.handleCancelOrderSuccess}
          handleCloseModalCancelOrder={this.handleCloseModalCancelOrder}
        />
      ),
    });
  };

  handleCancelOrderSuccess = () => {
    const { fetchOrders } = this.props;

    fetchOrders();
    this.handleCloseModalCancelOrder();
  };

  handleCloseModalCancelOrder = () => {
    const { resetCancelState, closeModal, unsetOrderToCancel } = this.props;

    closeModal();
    resetCancelState();
    unsetOrderToCancel();
  };

  goToPageOrders = () => {
    const { navigator } = this.props;
    navigate(navigator, { route: Routes.ORDERS_DASHBOARD });
  };

  handleOnDetailsClick = orderId => () => {
    const { navigator } = this.props;

    navigate(navigator, {
      route: Routes.ORDER_DETAILS,
      params: {
        orderId,
      },
    });
  };

  showTaxesSummaryModal = () => {
    this.setState({ showTaxesSummaryModal: true });
  };

  hideTaxesSummaryModal = () => {
    this.setState({ showTaxesSummaryModal: false });
  };

  render() {
    const { order, index, invoice, orderHeaderDetail } = this.props;
    const { toggleButton, toggleDocs, showTaxesSummaryModal } = this.state;
    if (isEmpty(order)) return null;

    const status = this.getOrderStatus(order);
    const paymentStatus = this.getPaymentStatus(order);
    const action = status && status.hasAction && this[status.actionName];

    return (
      <React.Fragment>
        <OrderCardDetails
          index={index}
          action={action}
          order={order}
          invoice={invoice}
          orderHeaderDetail={orderHeaderDetail}
          status={status}
          paymentStatus={paymentStatus}
          toggleButtonAction={this.toggleButton}
          toggleButton={toggleButton}
          triggerRef={this.triggerRef}
          handleClickOnOrderCancel={this.handleClickCancel}
          handleCloseModalCancelOrder={this.handleCloseModalCancelOrder}
          modalId={this.modalId}
          toggleDocs={toggleDocs}
          handleChangeDropdownVisibility={this.handleChangeDropdownVisibility}
          showTaxesSummaryModal={this.showTaxesSummaryModal}
        />
        {showTaxesSummaryModal && (
          <TaxesSummary
            orderId={order.id}
            onCloseModal={this.hideTaxesSummaryModal}
          />
        )}
      </React.Fragment>
    );
  }
}

OrderCardDetailsContainer.propTypes = {
  index: number,
  order: shape({
    id: string,
    date: string,
    amount: string,
    status: string,
    paymentStatus: string,
    requirer: string,
    canCancel: bool,
  }),
  openModal: func.isRequired,
  closeModal: func.isRequired,
  setOrderToCancel: func.isRequired,
  resetCancelState: func.isRequired,
  unsetOrderToCancel: func.isRequired,
  fetchOrders: func,
  orderHeaderDetail: shape({
    numberNewCards: number,
    numberOfEmployeesWithCredit: number,
    macAlimentacao: string,
    macRefeicao: string,
    macnai: string,
    amountmacefit: string,
    amount: string,
    requirer: string,
    employeesTotal: number,
    discount: string,
    rebate: string,
    showRebate: bool,
    taxes: string,
    hasTaxes: bool,
  }).isRequired,
  invoice: {},
};

OrderCardDetailsContainer.defaultProps = {
  fetchOrders: () => [],
  index: 0,
  order: {},
  invoice: {},
};

const mapDispatchToProps = {
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
  setOrderToCancel: orderActions.setOrderToCancel,
  resetCancelState: orderActions.resetCancelState,
  unsetOrderToCancel: orderActions.unsetOrderToCancel,
};

export default connect(null, mapDispatchToProps)(OrderCardDetailsContainer);
