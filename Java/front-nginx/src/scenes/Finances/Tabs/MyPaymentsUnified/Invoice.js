import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ClickOutsideListener, DropdownFiles } from "@common";
import { Dropdown } from "@base";
import { If } from "@utils";
import { Routes, WebPaths } from "src/routes/consts";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import {
  InvoiceRow,
  Cell,
  CellWithBorder,
  Field,
  Label,
  Value,
} from "./styles";

export class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    };

    this.triggerRef = React.createRef();
  }

  getDropdownOptions = showDocuments => {
    const options = [
      {
        value: "DETALHES_FATURA",
        description: "Detalhes da fatura",
      },
    ];

    showDocuments &&
      options.push({
        value: "DOCUMENTOS_DOWNLOAD",
        description: "Documentos para download",
      });

    return options;
  };

  checkDropdownDownloadVisibility = () => {
    const { statusEnum } = this.props;

    return statusEnum === "PENDENTE_PAGAMENTO" || statusEnum === "PAGO";
  };

  handleChangeDropdownVisibility = () => {
    if (!this.checkDropdownDownloadVisibility()) {
      const { showToast } = this.props;

      showToast({
        id: "information_toast_message",
        label: "Documentos não disponíveis!",
      });

      return;
    }

    this.setState(state => ({
      showDropdown: !state.showDropdown,
    }));
  };

  handleDropdown = option => {
    const {
      history,
      invoiceId,
      unificationTypeEnum,
      cnpj,
      costCenter,
    } = this.props;

    const invoiceParameters = {
      invoiceId: invoiceId === "-" ? null : invoiceId,
      unificationTypeEnum,
      cnpj,
      costCenter,
    };

    if (option.value === "DETALHES_FATURA") {
      history.push(WebPaths[Routes.MY_PAYMENTS], invoiceParameters);
    } else {
      this.handleChangeDropdownVisibility();
    }
  };

  render() {
    const {
      invoiceId,
      cnpj,
      amount,
      dueDate,
      unificationType,
      status,
      statusEnum,
      paymentType,
      totalOrders,
      allowRpsDownload,
      showDocuments,
      costCenter,
    } = this.props;
    const { showDropdown } = this.state;

    return (
      <Fragment>
        <InvoiceRow>
          <Cell withRadiusLeft>
            <Field isFlex>
              <Label>ID da fatura</Label>
              <Value>{invoiceId}</Value>
            </Field>
            <Field isFlex>
              <Label>Status</Label>
              <Value>{status}</Value>
            </Field>
          </Cell>

          <Cell>
            <CellWithBorder>
              <Field isFlex>
                <Label>Valor total</Label>
                <Value>{amount}</Value>
              </Field>
              <Field isFlex>
                <Label>Data vencimento</Label>
                <Value>{dueDate}</Value>
              </Field>
            </CellWithBorder>
          </Cell>

          <Cell>
            <Field isFlex>
              <Label>CNPJ</Label>
              <Value>{cnpj}</Value>
            </Field>
            <Field isFlex>
              <Label>Centro de custo</Label>
              <Value>{costCenter}</Value>
            </Field>
          </Cell>

          <Cell>
            <Field>
              <Label>Tipo unificação</Label>
              <Value>{unificationType}</Value>
            </Field>
          </Cell>

          <Cell>
            <Field>
              <Label>Nº de pedidos</Label>
              <Value>{totalOrders}</Value>
            </Field>
          </Cell>

          <Cell withRadiusRight>
            <Dropdown
              onClickOption={this.handleDropdown}
              optionsWidth="300px"
              optionLabelProperty="description"
              options={this.getDropdownOptions(showDocuments)}
            />
          </Cell>
        </InvoiceRow>

        <div>
          <If test={showDropdown}>
            <ClickOutsideListener
              id="details_header_click_outside_id_dropdown"
              handleClickOutside={this.handleChangeDropdownVisibility}
              isListening={showDropdown}
              triggerRef={this.triggerRef}
            >
              <DropdownFiles
                invoice={{
                  invoiceId,
                  allowRpsDownload,
                  invoiceStatus: statusEnum,
                  paymentType,
                }}
                handleChangeDropdownVisibility={
                  this.handleChangeDropdownVisibility
                }
              />
            </ClickOutsideListener>
          </If>
        </div>
      </Fragment>
    );
  }
}

Invoice.propTypes = {
  invoiceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  cnpj: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  unificationType: PropTypes.string.isRequired,
  unificationTypeEnum: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusEnum: PropTypes.string.isRequired,
  totalOrders: PropTypes.number.isRequired,
  paymentType: PropTypes.string.isRequired,
  allowRpsDownload: PropTypes.bool.isRequired,
  showToast: PropTypes.func,
  showDocuments: PropTypes.bool.isRequired,
  costCenter: PropTypes.string.isRequired,
};

Invoice.defaultProps = {
  showToast: () => null,
};

const mapDispatchToProps = {
  showToast: showToastAction,
};

export default withRouter(connect(null, mapDispatchToProps)(Invoice));
