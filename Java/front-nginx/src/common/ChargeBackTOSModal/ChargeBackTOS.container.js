import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { func, bool, shape } from "prop-types";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import { chargeBackCompanyRequest } from "src/redux/modules/chargeBack/action/ChargeBackSelected";
import { OpenModal as openModalAction } from "src/redux/modules/modal/actions/modal";
import * as ChargeBackActions from "src/redux/modules/chargeBack/action/ChargeBackModal";
import { requestStatus as Status, months } from "@enums";
import { NewModal, Loading } from "@base";
import { Loading as Load, AlertMessage } from "@common";

import { If, toCNPJMask } from "@utils";

import {
  StyledParagraph,
  ContentFooter,
  StyledError,
  LoadingWrapper,
} from "./ChargeBackTOS.styled";

export class ChargeBackTOSContainer extends PureComponent {
  state = {
    buttonEnabled: false,
  };

  componentDidMount = () => {
    this.fetchToS();
  };

  onClickButtonOkHandler = async () => {
    const { employees, company, companyChargeBack } = this.props;

    this.setState({ buttonEnabled: false });

    await companyChargeBack(employees, company);

    this.handleSubmit();
  };

  onContentBottomReachHandler = () => this.setState({ buttonEnabled: true });

  getMonthName = month => months[month];

  openAlertMessageModal = () => {
    const { openModal, closeModal } = this.props;

    openModal({
      children: (
        <AlertMessage
          iconName="error"
          title="Algo saiu errado!"
          message={
            <Fragment>
              <b>Não conseguimos processar seu estorno.</b>
              <br />
              Por favor, tente novamente. Se o problema <br /> persistir, entre
              em contato.
            </Fragment>
          }
          buttonText=""
          buttonAction={closeModal}
          height={450}
          width={260}
          cancelBtnText=""
        />
      ),
    });
  };

  handleSubmit = async () => {
    const {
      showToast,
      closeModal,
      redirect,
      statusChargeBack: { payload, requestStatus },
      unitary,
    } = this.props;
    if (requestStatus === Status.success) {
      if (unitary) {
        showToast({
          id: "new_chargeBack_success",
          label: `Solicitação de estorno nº ${payload.id} efetuada com sucesso!`,
          redirectText: "Visualizar solicitação",
          redirect: "Estorno",
          path: "/funcionarios",
        });

        closeModal();

        return;
      }
      closeModal();
      redirect();
      showToast({
        id: "order_new_voucher_success",
        label: `Solicitação de estorno nº ${payload.id} efetuada com sucesso!`,
      });
    } else {
      closeModal();
      this.openAlertMessageModal();
    }
  };

  fetchToS = () => {
    const {
      chargeBackTermsRequest,
      employees,
      company,
      isView,
      chargeBackTermsView,
      detailsHeader: { terms },
    } = this.props;

    if (isView) {
      chargeBackTermsView(terms);
      return;
    }

    chargeBackTermsRequest({
      companyId: company.id,
      reason: employees.cpfs[0].reasonKey,
    });
  };

  render() {
    const { buttonEnabled } = this.state;
    const {
      closeModal,
      isView,
      chargeBackTerms,
      statusChargeBack: { requestStatus },
    } = this.props;

    return (
      <Fragment>
        <If test={requestStatus === Status.loading}>
          <LoadingWrapper>
            <Loading loading />
          </LoadingWrapper>
        </If>
        <NewModal
          title="Termo de aceite do estorno"
          id="modal-tos"
          width="950px"
          isView={isView}
          contentHasScroll
          onContentBottomReach={this.onContentBottomReachHandler}
          okButtonProps={{
            value: "LI E ACEITO O TERMO",
            disabled: !buttonEnabled,
            onClick: this.onClickButtonOkHandler,
            id: "btn_accept_tos",
            popupText: !buttonEnabled
              ? "<p id='tooltip_read_terms' style='text-transform: initial'>Você precisa ler o termo antes de continuar.</p>"
              : null,
          }}
          cancelButtonProps={{
            onClick: closeModal,
            value: "Cancelar",
            id: "btn_cancel_tos",
          }}
          viewButtonProps={{
            onClick: closeModal,
            value: "FECHAR",
            id: "btn_cancel_tos",
          }}
        >
          <If test={chargeBackTerms.requestStatus === Status.loading}>
            <Load />
          </If>
          <If test={chargeBackTerms.requestStatus === Status.success}>
            <div>
              <StyledParagraph>
                A <b id="terms_company">{chargeBackTerms.company}</b>, inscrita
                no CNPJ nº{" "}
                <b id="terms_cnpj">{toCNPJMask(chargeBackTerms.cnpj)}</b>, com
                sede na{" "}
                <b id="terms_address">{chargeBackTerms.mountedAddress}</b>, por
                meio deste termo solicita o{" "}
                <b id="terms_chargeback_type">{chargeBackTerms.type}</b> de
                macefícios no âmbito do Contrato de Prestação de Serviço de
                Emissão e Gestão dos Cartões mac Refeição e mac Alimentação
                celebrado em <b id="terms_date">{chargeBackTerms.acceptDate}</b>
                .
              </StyledParagraph>

              <StyledParagraph>
                <b>1.</b> A <b id="terms_company">{chargeBackTerms.company}</b>{" "}
                tem ciência que:
              </StyledParagraph>

              <StyledParagraph>
                <b>(i)</b> nos termos do Contrato solicita mensalmente os
                macefícios nos respectivos Cartões mac de titularidade dos seus
                colaboradores;
              </StyledParagraph>

              <StyledParagraph>
                <b>(ii)</b> a presente solicitação de cancelamento/estorno
                refere-se exclusivamente aos valores creditados indevidamente em
                razão de(o) <b id="terms_reason">{chargeBackTerms.reason}</b>;
              </StyledParagraph>

              <StyledParagraph>
                <b>(iii)</b> a mac poderá negar a presente solicitação de{" "}
                <b id="terms_chargeback_type">{chargeBackTerms.type}</b> de
                macefício;
              </StyledParagraph>

              <StyledParagraph>
                <b>(iv)</b> esta solicitação de cancelamento/estorno está
                condicionada à existência de saldos nos Cartões mac e será
                limitada aos valores disponíveis no momento do{" "}
                <b id="terms_chargeback_type">{chargeBackTerms.type}</b>;
              </StyledParagraph>

              <StyledParagraph>
                <b>(v)</b> esta solicitação de cancelamento/estorno, se acatada
                pela mac, será processada em até 48 horas; e
              </StyledParagraph>

              <StyledParagraph>
                <b>(vi)</b> responderá e isentará a mac pelos danos e ressarcirá
                os prejuízos comprovadamente causados à mac pela solicitação de{" "}
                <b id="terms_chargeback_type">{chargeBackTerms.type}</b> dos
                macefícios.
              </StyledParagraph>

              <StyledParagraph>
                <b>2.</b> Os termos iniciados em letras maiúsculas poderão ter
                os seus respectivos significados definidos no Contrato.
              </StyledParagraph>

              <ContentFooter>
                <StyledParagraph>
                  <b id="terms_date_with_city">
                    {chargeBackTerms.city}, {chargeBackTerms.day} de{" "}
                    {this.getMonthName(chargeBackTerms.month)} de{" "}
                    {chargeBackTerms.year}.
                  </b>
                </StyledParagraph>
                <StyledParagraph>
                  <b id="terms_company">{chargeBackTerms.company}</b>
                </StyledParagraph>
              </ContentFooter>

              <span id="end_of_tos" />
            </div>
          </If>
          <If test={chargeBackTerms.requestStatus === Status.error}>
            <StyledError>Erro ao carregar as informações!</StyledError>
          </If>
        </NewModal>
      </Fragment>
    );
  }
}

ChargeBackTOSContainer.propTypes = {
  closeModal: func.isRequired,
  showToast: func.isRequired,
  isView: bool,
  employees: shape({}),
  company: shape({}),
  companyChargeBack: func.isRequired,
  redirect: func,
  statusChargeBack: shape({}).isRequired,
  chargeBackTermsRequest: func.isRequired,
  chargeBackTerms: shape().isRequired,
  unitary: bool,
  detailsHeader: shape({}),
  chargeBackTermsView: func,
  openModal: func.isRequired,
};

ChargeBackTOSContainer.defaultProps = {
  redirect: () => null,
  company: {},
  employees: {},
  isView: false,
  unitary: false,
  detailsHeader: {},
  chargeBackTermsView: () => null,
};

const mapStateToProps = ({ chargeBack, chargeBackModal, employee }) => ({
  statusChargeBack: chargeBack.chargebackRequest,
  chargeBackTerms: chargeBackModal.chargebackTerms,
  detailsHeader: employee.chargebackDetails.data.chargebacks,
});

const mapDispatchToProps = {
  closeModal: modalActions.CloseModal,
  showToast: showToastAction,
  companyChargeBack: chargeBackCompanyRequest,
  chargeBackTermsRequest: ChargeBackActions.chargeBackTermsRequest,
  chargeBackTermsView: ChargeBackActions.chargeBackTermsViewRequest,
  openModal: openModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChargeBackTOSContainer);
