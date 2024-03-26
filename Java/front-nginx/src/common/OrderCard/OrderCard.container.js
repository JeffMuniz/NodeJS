import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { bool, func, number, shape, string } from "prop-types";

import { WebPaths, Routes } from "src/routes/consts";
import * as companyTreeActions from "src/redux/modules/selectedCompanyTree/actions/selectedCompanyTree";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import * as orderActions from "src/redux/modules/order/actions";
import { trackEvent } from "src/modules/Tracking";
import navigate from "src/routes/navigate";

import {
  orderStatus as orderStatusEnum,
  paymentStatus as paymentStatusEnum,
} from "@enums";
import { getGroupAndUserIdFromState } from "src/utils/session";

import OrderCard from "./OrderCard";
import CancelOrder from "../CancelOrder/CancelOrder.container";

const CANCEL_ORDER_BUTTON_LABEL = "Cancelar Pedido";
class OrderCardContainer extends Component {
  constructor(props) {
    super(props);
    const { index, order } = this.props;
    this.state = {
      toggleButton: false,
      order,
      loading: false,
    };

    this.modalId = `cancel_order_modal_${index}`;
    this.triggerRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { order } = this.props;
    const {
      order: { status: prevStatus },
    } = prevProps;

    if (order.status === prevStatus) {
      return;
    }

    this.handleChangeState(order);
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

  handleChangeState = order => {
    this.setState({
      order,
    });
  };

  handleClickErrors = (orderId, showErrorMessage) => () => {
    const { navigator } = this.props;

    navigate(navigator, {
      route: Routes.ORDER_ERRORS,
      params: { orderId },
      data: { showErrorMessage },
    });
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
    const { fetchOrders, getOrdersLimit } = this.props;
    const { groupId: idGroup, userId } = getGroupAndUserIdFromState();

    this.setState({ loading: true });

    fetchOrders({ withVirtualBalanceUpdating: true });
    getOrdersLimit({ idGroup, userId });
    this.handleCloseModalCancelOrder();

    this.setState({ loading: false });
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
    const { navigator, page } = this.props;

    navigate(navigator, {
      route: Routes.ORDER_DETAILS,
      params: {
        orderId,
      },
      data: { page },
    });
  };

  handleOpenConfirmOrderPage = () => {
    const { navigator, order } = this.props;

    navigator.push(
      WebPaths[Routes.ORDER_CONFIRMATION].replace(":orderId", order.id),
    );
  };

  render() {
    const { opened, index } = this.props;
    const { toggleButton, order, loading } = this.state;
    if (isEmpty(order)) return null;
    const status = this.getOrderStatus(order);
    const paymentStatus = this.getPaymentStatus(order);
    const action = status && status.hasAction && this[status.actionName];
    const handleChangePage = orderId =>
      opened
        ? trackEvent("Saiu do detalhe de pedido", this.goToPageOrders)
        : trackEvent(
            `Entrou no detalhe do pedido ${orderId}`,
            this.handleOnDetailsClick(orderId),
          );

    const { description } = status;
    const validatingFileOrderStatus = description === "Validando Arquivo";
    const pendingUserOrderStatus = description === "Aguardando Confirmação";
    const showOptionsButton =
      description !== "Validando Arquivo" &&
      description !== "Processando" &&
      description !== "Invalidado";

    return (
      <OrderCard
        index={index}
        action={action}
        order={order}
        loadingCancelOrderModal={loading}
        status={status}
        paymentStatus={paymentStatus}
        opened={opened}
        handleChangePage={handleChangePage}
        toggleButtonAction={this.toggleButton}
        toggleButton={toggleButton}
        triggerRef={this.triggerRef}
        handleClickOnOrderCancel={this.handleClickCancel}
        handleCloseModalCancelOrder={this.handleCloseModalCancelOrder}
        handleOpenConfirmOrderPage={this.handleOpenConfirmOrderPage}
        modalId={this.modalId}
        validatingFileOrderStatus={validatingFileOrderStatus}
        pendingUserOrderStatus={pendingUserOrderStatus}
        showOptionsButton={showOptionsButton}
      />
    );
  }
}

OrderCardContainer.propTypes = {
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
  opened: bool,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  setOrderToCancel: func.isRequired,
  resetCancelState: func.isRequired,
  unsetOrderToCancel: func.isRequired,
  fetchOrders: func,
  page: number,
  getOrdersLimit: func.isRequired,
};

OrderCardContainer.defaultProps = {
  opened: false,
  fetchOrders: () => [],
  index: 0,
  order: {},
  page: 0,
};

const mapDispatchToProps = {
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
  getOrdersLimit: companyTreeActions.getSelectedGroupOrdersLimit,
  setOrderToCancel: orderActions.setOrderToCancel,
  resetCancelState: orderActions.resetCancelState,
  unsetOrderToCancel: orderActions.unsetOrderToCancel,
};

export default connect(null, mapDispatchToProps)(OrderCardContainer);
