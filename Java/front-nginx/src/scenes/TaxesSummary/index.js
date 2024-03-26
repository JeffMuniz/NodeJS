import React, { Component } from "react";
import PropTypes from "prop-types";
import { SimpleModal, LoadingWrapper } from "@base";
import { getTaxes } from "src/api/event";
import { TaxContainer, TaxItem, TaxLine, TaxLabel, TaxValue } from "./styles";

class ModalTaxes extends Component {
  state = {
    taxes: [],
    finalValue: 0,
    loading: false,
    hasError: false,
    messageError: "",
  };

  componentDidMount = async () => {
    this.fetchTaxes();
  };

  fetchTaxes = () => {
    const { orderId, cnpj } = this.props;

    this.setState({ loading: true, hasError: false, messageError: "" });

    getTaxes({
      orderId,
      cnpj,
      onSuccess: ({ taxes, finalValue }) =>
        this.setState({
          taxes,
          finalValue,
          loading: false,
        }),
      onError: messageError =>
        this.setState({ loading: false, hasError: true, messageError }),
    });
  };

  render = () => {
    const { taxes, finalValue, loading, hasError, messageError } = this.state;
    const { onCloseModal } = this.props;

    return (
      <SimpleModal
        title={!hasError && !loading ? "Taxas e tarifas" : ""}
        onClickCloseIcon={onCloseModal}
      >
        <TaxContainer {...{ loading, hasError }}>
          <LoadingWrapper {...{ loading, hasError, messageError }}>
            {taxes.map((tax, index) => (
              <TaxItem key={index}>
                <TaxLine>
                  <TaxLabel isBold>{tax.description}</TaxLabel>
                  <TaxValue isBold>{tax.totalValue}</TaxValue>
                </TaxLine>
                {tax.amountLabel && (
                  <TaxLine>
                    <TaxLabel>{tax.amountLabel}</TaxLabel>
                    <TaxValue>{tax.amount}</TaxValue>
                  </TaxLine>
                )}
                {tax.unitValueLabel && (
                  <TaxLine withBorder>
                    <TaxLabel>{tax.unitValueLabel}</TaxLabel>
                    <TaxValue>{tax.unitValue}</TaxValue>
                  </TaxLine>
                )}
              </TaxItem>
            ))}
            <TaxItem withSpacing>
              <TaxLine>
                <TaxLabel isBold isBigger>
                  Valor final:
                </TaxLabel>
                <TaxValue isBold isBigger>
                  {finalValue}
                </TaxValue>
              </TaxLine>
            </TaxItem>
          </LoadingWrapper>
        </TaxContainer>
      </SimpleModal>
    );
  };
}

ModalTaxes.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  cnpj: PropTypes.string,
};

ModalTaxes.defaultProps = {
  cnpj: "",
};

export default ModalTaxes;
