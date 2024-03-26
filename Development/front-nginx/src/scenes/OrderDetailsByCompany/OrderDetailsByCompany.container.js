import React, { Component } from "react";
import { connect } from "react-redux";
import { shape, string, number, func, bool } from "prop-types";
import get from "lodash/get";

import * as orderActions from "src/redux/modules/order/actions";
import { getAnticipationCredit } from "src/api/order/order";
import { getReceivableId } from "src/api/invoice/invoice";
import TaxesSummary from "src/scenes/TaxesSummary";
import OrderDetailsByCompany from "./OrderDetailsByCompany";

const TIME_TO_REFRESH_STATE = 12000;

class OrderDetailsByCompanyContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      toggleDocs: false,
      toggleReports: false,
      invoice: {},
      showTaxesSummaryModal: false,
      activeDetailTab: "Crédito",
      canCreditAnticipation: false,
      anticipationFeedbackMessage: false,
      textAnticipationButton: "",
      showCreditAnticipationModal: false,
    };

    this.triggerRef = React.createRef();
  }

  async componentDidMount() {
    await this.fetchOrdersDetailHeader();
    this.fetchOnlineCredit();
    this.fetchData();

    this.addReactiveCallback();
  }

  componentWillUnmount() {
    clearInterval(this.reactiveListener);
  }

  reactiveCallback = () => {
    const { loading } = this.state;
    const { orderDetail } = this.props;

    if (!loading && orderDetail.creditStatus === "CARGA_PROCESSANDO") {
      this.fetchOrdersDetailHeader({ withLoading: false });
    }
  };

  addReactiveCallback() {
    this.reactiveListener = setInterval(
      this.reactiveCallback.bind(this),
      TIME_TO_REFRESH_STATE,
    );
  }

  fetchData = async () => {
    const {
      match: {
        params: { orderId },
      },
      idUser,
      idGroup,
      orderDetail,
    } = this.props;

    await getReceivableId({
      orderId,
      idGroup,
      idUser,
      cnpj: orderDetail.cnpj,
      costCenter: orderDetail.costCenter,
      onSuccess: data => this.setState({ invoice: get(data, "content[0]") }),
    });
  };

  fetchOrdersDetailHeader = async ({ withLoading = true } = {}) => {
    const {
      getOrderDetail,
      match: {
        params: { orderId, chargeId },
      },
      idUser,
      idGroup,
    } = this.props;

    withLoading && this.setState({ loading: true });

    try {
      await getOrderDetail({
        idUser,
        chargeId,
        orderId,
        idGroup,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchOnlineCredit = async () => {
    const {
      match: {
        params: { orderId, chargeId },
      },
      orderDetail: { cnpj },
    } = this.props;

    const {
      canCreditAnticipation,
      anticipationFeedbackMessage,
      textAnticipationButton,
    } = await getAnticipationCredit({
      orderId,
      chargeId,
      cnpj,
    });

    this.setState({
      canCreditAnticipation,
      anticipationFeedbackMessage,
      textAnticipationButton,
    });
  };

  openCreditAnticipationModal = () => {
    this.setState({ showCreditAnticipationModal: true });
  };

  closeCreditAnticipationModal = async ({ anticipatedCredit }) => {
    this.setState({ showCreditAnticipationModal: false });

    if (anticipatedCredit) {
      await this.fetchOrdersDetailHeader();
      this.fetchOnlineCredit();
      this.fetchData();
    }
  };

  handleClickShowDocs = e => {
    const { toggleDocs } = this.state;
    e.stopPropagation();
    this.setState({ toggleDocs: !toggleDocs });
  };

  handleGoBack = () => {
    const {
      history: { goBack },
    } = this.props;

    goBack();
  };

  handleChangeDropdownVisibility = () => {
    const { toggleDocs } = this.state;
    this.setState({ toggleDocs: !toggleDocs });
  };

  handleChangeDropdownReportsVisibility = () => {
    const { toggleReports } = this.state;
    this.setState({ toggleReports: !toggleReports });
  };

  showTaxesSummaryModal = () => {
    this.setState({ showTaxesSummaryModal: true });
  };

  hideTaxesSummaryModal = () => {
    this.setState({ showTaxesSummaryModal: false });
  };

  render() {
    const { orderDetail } = this.props;
    const {
      loading,
      toggleDocs,
      invoice,
      toggleReports,
      showTaxesSummaryModal,
      activeDetailTab,
      showCreditAnticipationModal,
      anticipationFeedbackMessage,
      canCreditAnticipation,
      textAnticipationButton,
    } = this.state;

    return (
      <React.Fragment>
        <OrderDetailsByCompany
          orderDetail={orderDetail}
          handleGoBack={this.handleGoBack}
          handleChangePage={this.handleChangePage}
          loading={loading}
          toggleDocs={toggleDocs}
          toggleReports={toggleReports}
          handleClickShowDocs={this.handleClickShowDocs}
          invoice={invoice}
          handleChangeDropdownVisibility={this.handleChangeDropdownVisibility}
          handleChangeDropdownReportsVisibility={
            this.handleChangeDropdownReportsVisibility
          }
          showTaxesSummaryModal={this.showTaxesSummaryModal}
          triggerRef={this.triggerRef}
          showCreditAnticipationModal={showCreditAnticipationModal}
          closeCreditAnticipationModal={this.closeCreditAnticipationModal}
          openCreditAnticipationModal={this.openCreditAnticipationModal}
          anticipationFeedbackMessage={anticipationFeedbackMessage}
          textAnticipationButton={textAnticipationButton}
          canCreditAnticipation={canCreditAnticipation}
          activeDetailTab={activeDetailTab}
          handleClickDetailTab={tab => this.setState({ activeDetailTab: tab })}
        />
        {showTaxesSummaryModal && (
          <TaxesSummary
            cnpj={orderDetail.cnpj}
            orderId={orderDetail.orderId}
            onCloseModal={this.hideTaxesSummaryModal}
          />
        )}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({
  order: {
    details: { data },
  },
  user: {
    profile: {
      data: { id: idUser },
    },
  },
  selectedCompanyTree: {
    selectedGroup: { id: idGroup },
  },
}) => ({
  idUser,
  idGroup,
  orderDetail: data,
});

const mapDispatchToProps = {
  getOrderDetail: orderActions.getOrderDetail,
};

OrderDetailsByCompanyContainer.propTypes = {
  orderDetail: shape({
    orderId: number,
    employeesTotal: number,
    paymentStatus: string,
    cnpj: string,
    totalVR: string,
    totalVA: string,
    amount: string,
    discount: string,
    creditDate: string,
    companyName: string,
    centralized: bool,
    costCenter: string,
    creditStatus: string,
  }),
  getOrderDetail: func.isRequired,
  match: shape({
    params: shape({ orderId: string, chargeId: string }),
  }),
  idUser: string.isRequired,
  idGroup: number.isRequired,
};

OrderDetailsByCompanyContainer.defaultProps = {
  orderDetail: {},
  match: {
    params: {},
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailsByCompanyContainer);
