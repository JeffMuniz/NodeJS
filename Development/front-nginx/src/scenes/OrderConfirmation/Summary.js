import React from "react";
import PropTypes from "prop-types";
import * as featureFlag from "@utils/featureFlag";
import { Field, FieldLabel, FieldValue, SubTitle, Summary } from "./styles";

const SummaryWrapper = ({ order, onClickTaxes }) => (
  <Summary>
    <Field>
      <FieldLabel>Número do pedido:</FieldLabel>
      <FieldValue isBold>{order.id}</FieldValue>
    </Field>
    <Field addSeparationArea>
      <FieldLabel>Data do crédito:</FieldLabel>
      <FieldValue>{order.creditDate}</FieldValue>
    </Field>
    <SubTitle>Dados do pedido:</SubTitle>
    <Field withDivisor>
      <FieldLabel>Número de novos cartões gerados:</FieldLabel>
      <FieldValue isBold>{order.numberNewCards}</FieldValue>
    </Field>
    <Field withDivisor>
      <FieldLabel>Número de funcionários:</FieldLabel>
      <FieldValue isBold>{order.numberOfEmployees}</FieldValue>
    </Field>
    <Field withDivisor addSeparationArea>
      <FieldLabel>Funcionários com crédito:</FieldLabel>
      <FieldValue isBold>{order.numberOfEmployeesWithCredit}</FieldValue>
    </Field>
    <SubTitle>Valores e taxas:</SubTitle>
    <Field>
      <FieldLabel>mac alimentação</FieldLabel>
      <FieldValue>{order.macAlimentacao}</FieldValue>
    </Field>
    <Field>
      <FieldLabel>mac refeição</FieldLabel>
      <FieldValue>{order.macRefeicao}</FieldValue>
    </Field>
    {featureFlag.enablemacnai() && (
      <Field>
        <FieldLabel>mac flex</FieldLabel>
        <FieldValue>{order.macnai}</FieldValue>
      </Field>
    )}
    <Field withDivisor>
      <FieldLabel isBold>valor total macefício</FieldLabel>
      <FieldValue>{order.amountmacefit}</FieldValue>
    </Field>
    <Field>
      <FieldLabel>desconto</FieldLabel>
      <FieldValue>- {order.discount}</FieldValue>
    </Field>
    {order.showRebate && (
      <Field>
        <FieldLabel>rebate</FieldLabel>
        <FieldValue>- {order.rebate}</FieldValue>
      </Field>
    )}
    <Field withDivisor isDotted>
      <FieldLabel
        isLink={order.hasTaxes}
        onClick={order.hasTaxes ? onClickTaxes : null}
      >
        taxas e tarifas
      </FieldLabel>
      <FieldValue>{order.taxes}</FieldValue>
    </Field>
    <Field>
      <FieldLabel isBold>valor do pedido</FieldLabel>
      <FieldValue isBold>{order.amount}</FieldValue>
    </Field>
  </Summary>
);

SummaryWrapper.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    creditDate: PropTypes.string,
    numberNewCards: PropTypes.number,
    numberOfEmployees: PropTypes.number,
    numberOfEmployeesWithCredit: PropTypes.number,
    macAlimentacao: PropTypes.string,
    macRefeicao: PropTypes.string,
    macnai: PropTypes.string,
    discount: PropTypes.string,
    taxes: PropTypes.string,
    hasTaxes: PropTypes.bool,
    rebate: PropTypes.string,
    showRebate: PropTypes.bool,
    amount: PropTypes.string,
    amountmacefit: PropTypes.string,
  }),
  onClickTaxes: PropTypes.func.isRequired,
};

SummaryWrapper.defaultProps = {
  order: {},
};

export default SummaryWrapper;
