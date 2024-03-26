import React, { Component } from "react";
import { shape, func, arrayOf, string, number, bool } from "prop-types";
import { connect } from "react-redux";
import get from "lodash/get";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { getReceivableId } from "src/api/invoice/invoice";
import {
  getOrderDetailHeader,
  getAnticipationCredit,
} from "src/api/order/order";
import { OrderDetailsHeader } from "src/api/dtos/orderDetails.dto";

import * as orderActions from "src/redux/modules/order/actions";
import * as modalActions from "src/redux/modules/modal/actions/modal";

import CancelCharge from "./CancelCharge/CancelCharge.container";
import OrderDetails from "./OrderDetails";

export const itemsPerPage = 20;

const TIME_TO_REFRESH_STATE = 12000;

export class OrderDetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actualPage: 0,
      invoiceOrder: {},
      orderHeaderDetail: {},
      showCreditAnticipationModal: false,
      canCreditAnticipation: false,
      anticipationFeedbackMessage: "",
      textAnticipationButton: "",
      cnpj: "",
      centroCusto: "",
      loadingChargeList: true,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchOrderDetailHeader();
    this.fetchOnlineCredit();

    this.addReactiveListerner();
  }

  componentWillUnmount() {
    clearInterval(this.reactiveListener);
  }

  getUrlParam = () => {
    const {
      match: {
        params: { orderId },
      },
    } = this.props;

    return orderId;
  };

  getParams = () => {
    const { actualPage: page, cnpj, centroCusto } = this.state;
    const orderId = this.getUrlParam();
    const {
      userData: { id: idUser },
      selectedGroup: { id: idGroup },
    } = this.props;

    return { orderId, idGroup, idUser, page, cnpj, centroCusto };
  };

  addReactiveListerner = () => {
    this.reactiveListener = setInterval(
      this.reactiveCallback.bind(this),
      TIME_TO_REFRESH_STATE,
    );
  };

  checkIsProcessing() {
    const { orderDetailsData } = this.props;

    return orderDetailsData.data.isProcessing;
  }
  reactiveCallback() {
    if (this.allowReactiveCallback()) {
      this.handleLoadChargeList({ withLoading: false });
    }
  }

  allowReactiveCallback() {
    const { loading, loadingChargeList } = this.state;

    return !loading && !loadingChargeList && this.checkIsProcessing();
  }

  fetchData = async ({ withLoading = true } = {}) => {
    const {
      orderId,
      idGroup,
      idUser,
      page,
      cnpj,
      centroCusto,
    } = this.getParams();
    const { getOrder, getOrderDetails } = this.props;

    withLoading && this.setState({ loadingChargeList: true });

    getOrder({ orderId, idGroup, idUser, page });

    getOrderDetails({
      orderId,
      idGroup,
      idUser,
      page,
      itemsPerPage,
      cnpj,
      centroCusto,
      onFinally: () => this.setState({ loadingChargeList: false }),
    });

    getReceivableId({
      orderId,
      idGroup,
      idUser,
      onSuccess: data =>
        this.setState({
          invoiceOrder: get(data, "content[0]", {}),
          loadingChargeList: false,
        }),
    });
  };

  fetchOrderDetailHeader = async ({ withLoading = true } = {}) => {
    const { orderId, idGroup, idUser, page } = this.getParams();

    withLoading && this.setState({ loading: true });

    const { data } = await getOrderDetailHeader({
      orderId,
      idGroup,
      idUser,
      page,
    });

    const orderDetailHeader = OrderDetailsHeader(data);

    this.setState({ orderHeaderDetail: orderDetailHeader, loading: false });
  };

  fetchOnlineCredit = async () => {
    const { orderId } = this.getParams();

    const {
      canCreditAnticipation,
      anticipationFeedbackMessage,
      textAnticipationButton,
    } = await getAnticipationCredit({
      orderId,
    });

    this.setState({
      canCreditAnticipation,
      anticipationFeedbackMessage,
      textAnticipationButton,
    });
  };

  handleOpenExportOptions = () => {
    const { toggleDocs } = this.state;

    this.setState({ toggleDocs: !toggleDocs });
  };

  handleChangePage = ({ page }) =>
    this.setState({ actualPage: page }, this.handleLoadChargeList);

  handleLoadChargeList = async ({ withLoading = true } = {}) => {
    const {
      orderId,
      idGroup,
      idUser,
      page,
      cnpj,
      centroCusto,
    } = this.getParams();
    const { getOrderDetails } = this.props;

    withLoading && this.setState({ loadingChargeList: true });

    await getOrderDetails({
      orderId,
      idGroup,
      idUser,
      page,
      itemsPerPage,
      cnpj,
      centroCusto,
      onFinally: () => this.setState({ loadingChargeList: false }),
    });
  };

  hasOrderData = () => {
    const { orderData } = this.props;

    return !!(orderData.data && orderData.data.content);
  };

  handleGoBack = () => {
    const {
      history: { goBack },
    } = this.props;

    goBack();
  };

  handleOrderDetailsByCompanyPress = ({ orderId, chargeId }) => () => {
    const { history } = this.props;

    navigate(history, {
      route: Routes.ORDER_DETAILS_BY_COMPANY,
      params: { orderId, chargeId },
    });
  };

  handleClickCancel = ({ chargeId, orderId }) => () => {
    const { idUser } = this.getParams();
    const { openModal, setChargeToCancel } = this.props;

    setChargeToCancel({ chargeId, orderId, userId: idUser });

    openModal({
      customCloseModal: this.handleCloseModalCancelCharge,
      children: (
        <CancelCharge
          chargeId={chargeId}
          handleClickConfirmCancelCharge={() =>
            this.handleClickConfirmCancelCharge({
              chargeId,
              userId: idUser,
              orderId,
            })
          }
          handleCloseModalCancelCharge={this.handleCloseModalCancelCharge}
        />
      ),
    });
  };

  handleClickConfirmCancelCharge = async ({ chargeId, orderId, userId }) => {
    const { cancelCharge } = this.props;

    await cancelCharge({ chargeId, orderId, userId });
    this.fetchData();
    this.handleCloseModalCancelCharge();
  };

  handleCloseModalCancelCharge = () => {
    const { closeModal, resetCancelState, unsetChargeToCancel } = this.props;

    closeModal();
    resetCancelState();
    unsetChargeToCancel();
  };

  closeCreditAnticipationModal = async ({ anticipatedCredit }) => {
    this.setState({ showCreditAnticipationModal: false });

    if (anticipatedCredit) {
      await this.fetchData();
      this.fetchOrderDetailHeader();
      this.fetchOnlineCredit();
    }
  };

  openCreditAnticipationModal = () => {
    this.setState({ showCreditAnticipationModal: true });
  };

  handleInputFilter = ({ key, typedValue }) =>
    this.setState(
      {
        actualPage: 0,
        cnpj: "",
        centroCusto: "",
        [key]: typedValue,
      },
      this.handleLoadChargeList,
    );

  render() {
    const {
      orderData,
      orderDetailsData,
      selectedGroup,
      navigator,
      history,
    } = this.props;
    const {
      actualPage,
      invoiceOrder,
      orderHeaderDetail,
      showCreditAnticipationModal,
      anticipationFeedbackMessage,
      canCreditAnticipation,
      textAnticipationButton,
      loadingChargeList,
      loading,
    } = this.state;
    const hasOrder = this.hasOrderData();

    return (
      <OrderDetails
        hasOrder={hasOrder}
        actualPage={actualPage}
        itemsPerPage={itemsPerPage}
        orderData={orderData}
        orderDetailsData={orderDetailsData}
        orderHeaderDetail={orderHeaderDetail}
        headerClickHandler={this.handleGoBack}
        handleChangePage={this.handleChangePage}
        navigator={history || navigator}
        selectedGroup={selectedGroup}
        handleCompanyIdUpdate={this.fetchData}
        handleOrderDetailsByCompanyPress={this.handleOrderDetailsByCompanyPress}
        fetchOrders={this.fetchData}
        handleClickOnChargeCancel={this.handleClickCancel}
        invoiceOrder={invoiceOrder}
        handleOpenExportOptions={this.handleOpenExportOptions}
        showCreditAnticipationModal={showCreditAnticipationModal}
        closeCreditAnticipationModal={this.closeCreditAnticipationModal}
        openCreditAnticipationModal={this.openCreditAnticipationModal}
        anticipationFeedbackMessage={anticipationFeedbackMessage}
        canCreditAnticipation={canCreditAnticipation}
        textAnticipationButton={textAnticipationButton}
        handleInputFilter={this.handleInputFilter}
        startLoadingChargeList={() =>
          this.setState({ loadingChargeList: true })
        }
        loadingChargeList={loadingChargeList}
        loading={loading}
      />
    );
  }
}

OrderDetailsContainer.propTypes = {
  match: shape({
    params: shape({
      orderId: string,
    }),
  }).isRequired,
  orderData: shape({
    id: string.isRequired,
    date: string.isRequired,
    amount: string.isRequired,
    status: string.isRequired,
    paymentStatus: string,
    cnpj: string.isRequired,
    requirer: string.isRequired,
    branchesOrders: arrayOf(
      shape({
        id: string.isRequired,
        cnpj: string.isRequired,
        totalEmployees: string.isRequired,
        amount: string.isRequired,
      }),
    ),
  }),
  orderDetailsData: shape({
    data: shape({
      isProcessing: bool,
      totalItems: number,
      content: arrayOf(
        shape({
          orderId: string,
          branchId: string,
          cnpj: string,
          amount: string,
          status: string,
          totalEmployee: string,
          chargeId: string,
          anticipationFeedbackMessage: string,
        }),
      ),
    }),
    requestStatus: string,
  }),
  selectedGroup: shape({
    id: number,
    name: string,
  }),
  userData: shape({
    id: string,
  }),
  getOrder: func,
  getOrderDetails: func,
  openModal: func.isRequired,
  closeModal: func.isRequired,

  cancelCharge: func.isRequired,
  setChargeToCancel: func.isRequired,
  resetCancelState: func.isRequired,
  unsetChargeToCancel: func.isRequired,
};

OrderDetailsContainer.defaultProps = {
  orderData: {},
  orderDetailsData: {
    content: [],
    totalItems: 0,
    requestStatus: "",
    isProcessing: false,
  },
  getOrder: () => null,
  getOrderDetails: () => null,
  selectedGroup: {},
  userData: {},
};

export const mapStateToProps = ({
  order: { orderStatus: orderData, orderDetailsStatus: orderDetailsData },
  user: {
    profile: { data: userData },
  },
  selectedCompanyTree,
}) => ({
  orderData,
  orderDetailsData,
  userData,
  selectedGroup: selectedCompanyTree.selectedGroup,
});

export const mapDispatchToProps = {
  getOrder: orderActions.getOrder,
  getOrderDetails: orderActions.getOrderDetails,
  getOrderDetailHeader: orderActions.getOrderDetailheader,
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
  cancelCharge: orderActions.cancelCharge,
  setChargeToCancel: orderActions.setChargeToCancel,
  resetCancelState: orderActions.resetCancelState,
  unsetChargeToCancel: orderActions.unsetChargeToCancel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailsContainer);
