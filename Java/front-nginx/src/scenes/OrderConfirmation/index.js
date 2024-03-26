import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from "lodash/get";
import { ContainerWrapper, Placeholder } from "@base";
import { SvgIcon, ModalConfirmationDialog, ModalFeedback } from "@common";
import { TaxesSummary } from "@scenes";
import * as featureFlag from "@utils/featureFlag";
import {
  getOrderConfirmationDetails,
  getAnticipationCredit,
  confirmOrder,
  cancelOrder,
} from "src/api/order/order";

import Summary from "./Summary";
import Footer from "./Footer";
import CreditAnticipation from "./CreditAnticipation";

import {
  Content,
  ContentBody,
  SubTitle,
  PaymentModes,
  PaymentCard,
  ErrorMessage,
} from "./styles";

class OrderConfirmation extends Component {
  state = {
    isLoading: true,
    order: {},
    gettingError: null,
    sendingError: null,
    showCancelOrderModal: false,
    showFinalFeedback: false,
    showTaxesSummaryModal: false,
    hasOrderCreditAnticipation: false,
    finalFeedbackMessage: "",
    creditAnticipation: {},
  };

  componentDidMount() {
    this.fetchOrder();
    this.fetchOnlineCredit();
  }

  getOrderId = () => {
    const { match } = this.props;

    return match.params.orderId;
  };

  fetchOrder = () => {
    getOrderConfirmationDetails({
      orderId: this.getOrderId(),
      onSuccess: order => this.setState({ order, isLoading: false }),
      onError: gettingError =>
        this.setState({ gettingError, isLoading: false }),
    });
  };

  fetchOnlineCredit = async () => {
    const creditAnticipation = await getAnticipationCredit({
      orderId: this.getOrderId(),
    });

    this.setState({ creditAnticipation });
  };

  handleCancelOrder = () => {
    this.setState({ isLoading: true });

    cancelOrder({
      orderId: this.getOrderId(),
      onSuccess: () => {
        this.setState({
          isLoading: false,
          showCancelOrderModal: false,
          showFinalFeedback: true,
          finalFeedbackMessage: "Seu pedido foi cancelado com sucesso.",
        });
      },
      onError: sendingError =>
        this.setState({
          showCancelOrderModal: false,
          sendingError,
          isLoading: false,
        }),
    });
  };

  handleConfirmOrder = () => {
    const { hasOrderCreditAnticipation } = this.state;
    const { isPrepaid } = this.props;

    this.setState({ isLoading: true });

    confirmOrder({
      hasOrderCreditAnticipation,
      orderId: this.getOrderId(),
      onSuccess: () => {
        this.setState({
          isLoading: false,
          showFinalFeedback: true,
        });

        if (hasOrderCreditAnticipation) {
          this.setState({
            finalFeedbackMessage: isPrepaid
              ? "O pedido foi confirmado e o crédito será antecipado quando o pagamento for identificado."
              : "Seu pedido foi confirmado e o crédito será antecipado.",
          });
        } else {
          this.setState({
            finalFeedbackMessage: "Seu pedido foi confirmado com sucesso.",
          });
        }
      },
      onError: sendingError =>
        this.setState({ sendingError, isLoading: false }),
    });
  };

  render() {
    const { history, paymentType } = this.props;
    const {
      isLoading,
      order,
      gettingError,
      sendingError,
      showCancelOrderModal,
      showFinalFeedback,
      showTaxesSummaryModal,
      hasOrderCreditAnticipation,
      finalFeedbackMessage,
      creditAnticipation,
    } = this.state;

    return (
      <ContainerWrapper
        showBackIcon
        isMediumTitle
        title="Confirmar pedido"
        loading={isLoading}
        headerClickHandler={() => history.goBack()}
      >
        <Placeholder
          hasError={!!gettingError && !isLoading}
          message={gettingError}
        >
          <Content>
            <ContentBody>
              <Summary
                {...{ order }}
                onClickTaxes={() =>
                  this.setState({ showTaxesSummaryModal: true })
                }
              />
              <PaymentModes>
                {featureFlag.enableCreditAnticipation() && (
                  <CreditAnticipation
                    creditAnticipation={creditAnticipation}
                    anticipationTax={order.anticipationTax}
                    hasOrderCreditAnticipation={hasOrderCreditAnticipation}
                    onChangeOption={value =>
                      this.setState({ hasOrderCreditAnticipation: value })
                    }
                  />
                )}
                <SubTitle>Forma de pagamento:</SubTitle>
                <PaymentCard>
                  <SvgIcon name="check" size={50} />
                  {paymentType === "BOLETO" ? "Boleto bancário" : "TED"}
                </PaymentCard>
              </PaymentModes>
            </ContentBody>
            <Footer
              handleCancel={() => this.setState({ showCancelOrderModal: true })}
              handleConfirm={this.handleConfirmOrder}
            />
            {sendingError && <ErrorMessage>{sendingError}</ErrorMessage>}
          </Content>
        </Placeholder>
        {showTaxesSummaryModal && (
          <TaxesSummary
            orderId={this.getOrderId()}
            onCloseModal={() => this.setState({ showTaxesSummaryModal: false })}
          />
        )}
        {showCancelOrderModal && (
          <ModalConfirmationDialog
            callbackSubmitButton={this.handleCancelOrder}
            closeModal={() => this.setState({ showCancelOrderModal: false })}
            description="Tem certeza que deseja cancelar o pedido?"
          />
        )}
        {showFinalFeedback && (
          <ModalFeedback
            closeModal={() => history.goBack()}
            description={finalFeedbackMessage}
          />
        )}
      </ContainerWrapper>
    );
  }
}

OrderConfirmation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.string,
    }),
  }),
  paymentType: PropTypes.string,
  isPrepaid: PropTypes.bool,
};

OrderConfirmation.defaultProps = {
  match: {
    params: {},
  },
  paymentType: "BOLETO",
  isPrepaid: false,
};

const mapStateToProps = ({ selectedCompanyTree }) => ({
  paymentType: get(selectedCompanyTree, "selectedGroup.params.paymentType"),
  isPrepaid: get(selectedCompanyTree, "selectedGroup.params.isPrepaid"),
});

export default connect(mapStateToProps)(OrderConfirmation);
