import React from "react";
import { connect } from "react-redux";
import { arrayOf, bool, func, number, shape, string } from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";
import { If, toNumberMask } from "@utils";
import { ClickOutsideListener, DropdownFiles, DropdownReports } from "@common";
import { blue } from "@colors";
import {
  dateHourFormats,
  orderStatus as orderStatusEnum,
  paymentStatus as paymentStatusEnum,
  orderDetailsStatus,
} from "@enums";

import * as featureFlag from "@utils/featureFlag";

import {
  BorderVertical,
  ItemLabel,
} from "src/common/OrderCardDetails/OrderCardDetails.styles";
import {
  Container,
  Item,
  ItemFlex,
  ItemKey,
  ItemKeySize,
  ItemValue,
  Title,
  TitleColumn,
  TitleValue,
  StatusIcon,
  ItemTitleLink,
  Button,
  ContainerItem,
  ItemEmployeesTotal,
  ItemEmployees,
  StatusLabel,
  ItemValueTotal,
  ItemValueSample,
} from "./DetailsHeader.styles";

const DetailsHeader = ({
  orderDetail: {
    orderId,
    cnpj,
    employeesTotal,
    employeesCreditTotal,
    newCardsTotal,
    totalVR,
    totalVA,
    macnai,
    macefitAmount,
    amount,
    discount,
    rebate,
    showRebate,
    taxes,
    hasTaxes,
    orderDate,
    creditDate,
    companyName,
    centralized,
    creditStatus,
    paymentStatus,
    orderStatus: status,
    requirer,
    reports,
    costCenter,
  },
  invoice,
  toggleDocs,
  toggleReports,
  handleChangeDropdownVisibility,
  handleChangeDropdownReportsVisibility,
  showTaxesSummaryModal,
  triggerRef,
  isUnifiedInvoice,
}) => {
  const orderStatus = orderStatusEnum[status] || {
    icon: "",
    description: "",
    color: "",
  };
  const payment = paymentStatusEnum[paymentStatus] || {
    description: "",
    color: "",
  };

  const credit = orderDetailsStatus[creditStatus] || null;

  const canDownloadDocuments = () =>
    !centralized && !isUnifiedInvoice && invoice.showDocuments;

  return (
    <Container id="details_header">
      <ContainerItem>
        <div>
          <TitleColumn>
            <Title>Pedido</Title>
            <TitleValue id="details_header_id">{orderId}</TitleValue>
          </TitleColumn>
          <Item>
            <ItemKey>Razão Social:</ItemKey>
            <ItemValue id="details_header_company_name">
              {companyName}
            </ItemValue>
            <ItemKey>CNPJ:</ItemKey>
            <ItemValue id="details_header_cnpj">{cnpj}</ItemValue>
            <ItemKey>Números de funcionários do pedido:</ItemKey>
            <ItemEmployeesTotal>
              <div>
                <ItemEmployees>
                  {toNumberMask(employeesTotal || 0)}
                </ItemEmployees>
                <ItemLabel>Total</ItemLabel>
              </div>
              <div>
                <ItemEmployees>
                  {toNumberMask(employeesCreditTotal || 0)}
                </ItemEmployees>
                <ItemLabel>Com Crédito Ativos</ItemLabel>
              </div>
              <div>
                <ItemEmployees>
                  {toNumberMask(newCardsTotal || 0)}
                </ItemEmployees>
                <ItemLabel>Cartões Novos</ItemLabel>
              </div>
            </ItemEmployeesTotal>
          </Item>
        </div>
        <BorderVertical>
          <div />
        </BorderVertical>
        <div>
          <TitleColumn>
            <If test={canDownloadDocuments()}>
              <ClickOutsideListener
                id="details_header_click_outside_id_dropdown"
                handleClickOutside={handleChangeDropdownVisibility}
                isListening={toggleDocs}
                triggerRef={triggerRef}
              >
                <ItemTitleLink>
                  <Button
                    id="show_docs_"
                    imgSrc="arrowDown"
                    imgColor={blue}
                    imgWidth={20}
                    buttonType="link"
                    value="Ver documentos financeiros"
                    onClick={handleChangeDropdownVisibility}
                  />
                  <If test={toggleDocs}>
                    <DropdownFiles
                      invoice={invoice}
                      handleChangeDropdownVisibility={
                        handleChangeDropdownVisibility
                      }
                    />
                  </If>
                </ItemTitleLink>
              </ClickOutsideListener>
            </If>
          </TitleColumn>
          <Item>
            <ItemKey>Requisitante:</ItemKey>
            <ItemValueSample id="details_header_requirer">
              {requirer}
            </ItemValueSample>
            <ItemKey>Data do Pedido:</ItemKey>
            <ItemValueSample id="details_header_creation_date">
              {orderDate
                ? DateManager.utc(orderDate).format(
                    dateHourFormats.longDateSlash,
                  )
                : "-"}
            </ItemValueSample>
            <ItemKey>Data do Crédito:</ItemKey>
            <ItemValueSample id="details_header_credit_date">
              {creditDate
                ? DateManager.utc(creditDate).format(
                    dateHourFormats.longDateSlash,
                  )
                : "-"}{" "}
            </ItemValueSample>
            {costCenter && (
              <React.Fragment>
                <ItemKey>Centro de custo:</ItemKey>
                <ItemValueSample id="details_header_cost_center">
                  {costCenter}
                </ItemValueSample>
              </React.Fragment>
            )}
          </Item>
        </div>
        <BorderVertical>
          <div />
        </BorderVertical>
        <div>
          <TitleColumn positionLeft>
            <If test={!!reports}>
              <ClickOutsideListener
                id="details_header_click_outside_id_dropdown"
                isListening={toggleReports}
                triggerRef={triggerRef}
                handleClickOutside={handleChangeDropdownReportsVisibility}
              >
                <ItemTitleLink>
                  <Button
                    id="show_report_"
                    imgSrc="download"
                    imgColor={blue}
                    imgWidth={20}
                    buttonType="link"
                    value="Exportar relatórios"
                    onClick={handleChangeDropdownReportsVisibility}
                  />
                  <If test={toggleReports}>
                    <DropdownReports
                      reports={reports}
                      handleChangeDropdownReportsVisibility={
                        handleChangeDropdownReportsVisibility
                      }
                    />
                  </If>
                </ItemTitleLink>
              </ClickOutsideListener>
            </If>
          </TitleColumn>
          <Item>
            <ItemKey>Status Pedido:</ItemKey>
            <StatusIcon
              alt={orderStatus.description}
              title={orderStatus.description}
              id="order_card_status_icon"
            >
              <StatusLabel color={orderStatus.iconColor}>
                {orderStatus.description}
              </StatusLabel>
            </StatusIcon>
            <ItemKey>Status Pagamento:</ItemKey>
            <StatusLabel color={payment.color}>
              {payment.description || "-"}
            </StatusLabel>
            <ItemKey>Status Crédito:</ItemKey>
            <StatusIcon
              id="details_header_credit_status"
              data-status={credit.key || ""}
              title={credit.key || ""}
            >
              <StatusLabel color={credit.color}>
                {credit.description}
              </StatusLabel>
            </StatusIcon>
          </Item>
        </div>
        <BorderVertical>
          <div />
        </BorderVertical>
        <div>
          <TitleColumn>
            <ItemValueTotal>
              <Title>Valores</Title>
            </ItemValueTotal>
          </TitleColumn>
          <Item>
            <div>
              <ItemFlex>
                <ItemKeySize>mac alimentação</ItemKeySize>
                <ItemValue id="details_header_total_va" fontWeight="true">
                  <div>{totalVA}</div>
                </ItemValue>
              </ItemFlex>
              <ItemFlex
                borderBottom={centralized && !featureFlag.enablemacnai()}
              >
                <ItemKeySize>mac refeição</ItemKeySize>
                <ItemValue id="details_header_total_vr" fontWeight="true">
                  <div>{totalVR}</div>
                </ItemValue>
              </ItemFlex>
              {featureFlag.enablemacnai() && (
                <ItemFlex borderBottom={centralized}>
                  <ItemKeySize>mac flex</ItemKeySize>
                  <ItemValue id="details_header_total_flex" fontWeight="true">
                    <div>{macnai}</div>
                  </ItemValue>
                </ItemFlex>
              )}
              <If test={!centralized}>
                <ItemFlex borderBottom>
                  <ItemKeySize fontWeight="true">total macefício</ItemKeySize>
                  <ItemValue id="details_header_total_without_rebate">
                    <div>{macefitAmount}</div>
                  </ItemValue>
                </ItemFlex>
                <ItemFlex>
                  <ItemKeySize>desconto</ItemKeySize>
                  <ItemValue id="details_header_discount" fontWeight="true">
                    {discount}
                  </ItemValue>
                </ItemFlex>
                <If test={showRebate}>
                  <ItemFlex>
                    <ItemKeySize>rebate</ItemKeySize>
                    <ItemValue id="details_header_rebate" fontWeight="true">
                      {rebate}
                    </ItemValue>
                  </ItemFlex>
                </If>
                <ItemFlex borderBottom>
                  <ItemKeySize
                    isLink={hasTaxes}
                    onClick={hasTaxes ? showTaxesSummaryModal : null}
                  >
                    taxas e tarifas
                  </ItemKeySize>
                  <ItemValue id="details_header_taxes" fontWeight="true">
                    <div>{taxes}</div>
                  </ItemValue>
                </ItemFlex>
              </If>
              <ItemFlex>
                <ItemKeySize fontWeight="true">valor total</ItemKeySize>
                <ItemValue id="details_header_total">
                  <div>{centralized ? macefitAmount : amount}</div>
                </ItemValue>
              </ItemFlex>
            </div>
          </Item>
        </div>
      </ContainerItem>
    </Container>
  );
};

DetailsHeader.propTypes = {
  orderDetail: shape({
    orderId: number,
    cnpj: string,
    employeesTotal: number,
    employeesCreditTotal: number,
    newCardsTotal: number,
    totalVR: string,
    totalVA: string,
    macnai: string,
    macefitAmount: string,
    amount: string,
    discount: string,
    rebate: string,
    showRebate: bool,
    taxes: string,
    hasTaxes: bool,
    orderDate: string,
    creditDate: string,
    companyName: string,
    centralized: bool,
    creditStatus: string,
    paymentStatus: string,
    status: string,
    requirer: string,
    reports: arrayOf(
      shape({ chavePesquisa: string, formato: string, tipo: string }),
    ),
    costCenter: string,
  }),
  invoice: shape({
    receivableId: number,
    orderId: number,
    cnpj: string,
    amount: string,
    dueDate: string,
    paymentType: string,
    receivableStatus: string,
    invoiceDate: string,
    showDocuments: bool,
  }),
  toggleDocs: bool,
  toggleReports: bool,
  triggerRef: shape({}),
  handleChangeDropdownVisibility: func.isRequired,
  handleChangeDropdownReportsVisibility: func.isRequired,
  showTaxesSummaryModal: func.isRequired,
  isUnifiedInvoice: bool,
};

DetailsHeader.defaultProps = {
  orderDetail: {},
  invoice: {},
  toggleDocs: false,
  toggleReports: false,
  triggerRef: {},
  isUnifiedInvoice: false,
};

const mapStateToProps = ({
  selectedCompanyTree: {
    selectedGroup: {
      params: { isUnifiedInvoice },
    },
  },
}) => ({
  isUnifiedInvoice,
});

export default connect(mapStateToProps, null)(DetailsHeader);
