import React from "react";
import PropTypes from "prop-types";

import { Loading } from "@base";
import { If } from "@utils";

import HeaderItem from "./HeaderItem";
import Documents from "./Documents";

import { Container, Column, Line, LoadingWrapper } from "./styles";

const Header = ({
  invoice: {
    invoiceId,
    totalOrders,
    cnpj,
    companyName,
    dueDate,
    paymentType,
    status,
    statusEnum,
    statusColor,
    macAlimen,
    macRefei,
    discount,
    rebate,
    amount,
    allowRpsDownload,
    unificationType,
    showDocuments,
  },
  loading,
}) => (
  <Container>
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <Column minWidth="265px" withVerticalBorder>
        <HeaderItem label="Fatura" value={invoiceId} boldLabel highlighted />
        <HeaderItem
          label="Razão Social:"
          value={companyName}
          boldValue
          vertical
        />
        <HeaderItem label="CNPJ:" value={cnpj} boldValue vertical />
        <HeaderItem
          label="Tipo Faturamento:"
          value={unificationType}
          boldValue
          vertical
        />
        <HeaderItem
          label="Quantidade de Pedidos:"
          value={totalOrders}
          boldValue
          vertical
        />
      </Column>
      <Column minWidth="265px" withVerticalBorder>
        <If test={showDocuments}>
          <Documents
            invoice={{
              invoiceId,
              allowRpsDownload,
              invoiceStatus: statusEnum,
              paymentType,
            }}
          />
        </If>
        <HeaderItem
          label="Data de Vencimento:"
          marginTop="48px"
          value={dueDate}
          boldValue
          vertical
        />

        <HeaderItem
          label="Forma de Pagamento:"
          value={paymentType}
          boldValue
          vertical
        />
        <HeaderItem
          label="Status do Pagamento:"
          value={status}
          color={statusColor}
          boldValue
          vertical
        />
      </Column>
      <Column minWidth="220px">
        <HeaderItem label="Valores" highlighted />
        <HeaderItem label="mac alimentação" value={macAlimen} widthLabel />
        <HeaderItem label="mac refeição" value={macRefei} widthLabel />
        <HeaderItem
          label="desconto"
          value={discount}
          marginLeft="-4px"
          widthLabel
        />
        <If test={rebate}>
          <HeaderItem
            label="rebate"
            value={rebate}
            marginLeft="-4px"
            widthLabel
          />
        </If>
        <Line />
        <HeaderItem
          label="Total"
          value={amount}
          boldLabel
          boldValue
          widthLabel
        />
      </Column>
    </If>
  </Container>
);

Header.propTypes = {
  invoice: PropTypes.shape({
    invoiceId: PropTypes.number,
    totalOrders: PropTypes.number,
    cnpj: PropTypes.string,
    companyName: PropTypes.string,
    dueDate: PropTypes.string,
    paymentType: PropTypes.string,
    status: PropTypes.string,
    statusEnum: PropTypes.string,
    statusColor: PropTypes.string,
    macAlimen: PropTypes.string,
    macRefei: PropTypes.string,
    discount: PropTypes.string,
    rebate: PropTypes.string,
    amount: PropTypes.string,
    allowRpsDownload: PropTypes.bool,
    unificationType: PropTypes.string,
    showDocuments: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Header;
