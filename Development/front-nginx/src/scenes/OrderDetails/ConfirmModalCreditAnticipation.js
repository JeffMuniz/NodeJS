import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import get from "lodash/get";

import { SimpleModal, LoadingWrapper } from "@base";
import { SvgIcon, Button as CommonButton, ModalFeedback } from "@common";
import { borderGrey, veryLightBlack } from "@colors";

import { confirmAnticipationCredit } from "src/api/order/order";

export const Button = styled(CommonButton)`
  height: 50px;
  min-width: 140px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
  border-top: 1px solid ${borderGrey};
`;

export const ModalBody = styled.div`
  text-align: center;
  padding: 50px 0 30px;
  color: ${veryLightBlack};
`;

export const ModalContent = styled.div`
  padding: 0 30px 30px;
`;

export const ModalTitle = styled.h3`
  font-size: 1em;
  font-weight: bold;
`;

class ConfirmModalCreditAnticipation extends Component {
  state = {
    isLoading: false,
    hasError: false,
    hasSuccess: false,
  };

  getOrderIdAndChargeId = () => {
    const {
      match: {
        params: { orderId, chargeId },
      },
    } = this.props;

    return { orderId, chargeId };
  };

  getDescription = () => {
    const { cnpj } = this.props;
    const { orderId, chargeId } = this.getOrderIdAndChargeId();

    const chargeText = chargeId ? `do CNPJ ${cnpj}` : "";

    return `${chargeText} do pedido ${orderId}`;
  };

  handleConfirm = () => {
    const { orderId, chargeId } = this.getOrderIdAndChargeId();

    this.setState({ isLoading: true, hasError: false, hasSuccess: false });

    confirmAnticipationCredit({
      orderId,
      chargeId,
      onSuccess: () => this.setState({ hasSuccess: true }),
      onError: () => this.setState({ hasError: true }),
      onFinally: () => this.setState({ isLoading: false }),
    });
  };

  renderConfirmModal() {
    const {
      onClose,
      creditAnticipationTax,
      showCreditAnticipationTax,
    } = this.props;
    const { isLoading } = this.state;
    const { isPrepaid } = this.props;

    return (
      <SimpleModal
        paddingless
        width="700px"
        height="426px"
        onClickCloseIcon={onClose}
      >
        <LoadingWrapper loading={isLoading} paddingTop="170px">
          <ModalBody>
            <ModalContent>
              <div>
                <SvgIcon name="calendar" size={70} />
              </div>
              <ModalTitle>
                Antecipar o crédito {this.getDescription()}
                {isPrepaid ? "" : " para hoje"}?
              </ModalTitle>
              <p>
                Serão antecipados somente os créditos dos funcionários que não
                tiverem cartões emitidos neste pedido.
              </p>
              {showCreditAnticipationTax ? (
                <p>
                  A taxa de antecipação será de {creditAnticipationTax} e
                  cobrada no próximo pedido.
                </p>
              ) : (
                <p>A taxa de antecipação do serviço será de R$ 0,00.</p>
              )}
            </ModalContent>
            <ButtonWrapper>
              <Button
                id="button_cancel_action"
                onPress={onClose}
                value="CANCELAR"
                buttonType="light"
              />
              <Button
                id="button_confirm_action"
                onPress={this.handleConfirm}
                value="SIM, QUERO ANTECIPAR"
                buttonType="warning"
              />
            </ButtonWrapper>
          </ModalBody>
        </LoadingWrapper>
      </SimpleModal>
    );
  }

  render() {
    const { hasError, hasSuccess } = this.state;
    const { onClose, isPrepaid } = this.props;

    const description = hasSuccess
      ? `A solicitação de antecipação de crédito ${this.getDescription()} foi feita com sucesso. 
          ${
            isPrepaid
              ? "Os créditos solicitados estarão disponíveis nos cartões dos seus funcionários após confirmação do pagamento."
              : "Em alguns minutos os créditos solicitados estarão disponíveis nos cartões dos seus funcionários."
          }`
      : "Não foi possível realizar sua solicitação.";

    return hasError || hasSuccess ? (
      <ModalFeedback
        width={hasSuccess ? "550px" : "450px"}
        iconName={hasSuccess ? "success" : "warning"}
        closeModal={() => onClose({ anticipatedCredit: hasSuccess })}
        description={description}
      />
    ) : (
      this.renderConfirmModal()
    );
  }
}

ConfirmModalCreditAnticipation.propTypes = {
  cnpj: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  creditAnticipationTax: PropTypes.string,
  showCreditAnticipationTax: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.string,
      chargeId: PropTypes.string,
    }),
  }),
  isPrepaid: PropTypes.bool,
};

ConfirmModalCreditAnticipation.defaultProps = {
  cnpj: null,
  creditAnticipationTax: "",
  showCreditAnticipationTax: false,
  match: { params: { orderId: null, chargeId: null } },
  isPrepaid: false,
};

const mapStateToProps = ({ order, selectedCompanyTree }) => ({
  cnpj: get(order, "details.data.cnpj"),
  creditAnticipationTax: get(
    order,
    "orderStatus.data.content.creditAnticipationTax",
  ),
  showCreditAnticipationTax: get(
    order,
    "orderStatus.data.content.showCreditAnticipationTax",
  ),
  paymentType: get(selectedCompanyTree, "selectedGroup.params.paymentType"),
  isPrepaid: get(selectedCompanyTree, "selectedGroup.params.isPrepaid"),
});

export default connect(mapStateToProps)(
  withRouter(ConfirmModalCreditAnticipation),
);
