import React from "react";
import { connect } from "react-redux";
import { shape, string, bool, func, number } from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";
import { trackEvent } from "src/modules/Tracking";
import { If } from "@utils";
import { dateHourFormats } from "@enums";
import { ClickOutsideListener, DropdownFiles, SvgIcon } from "@common";
import { blue } from "@colors";
import * as featureFlag from "@utils/featureFlag";

import {
  Container,
  Item,
  ItemContent,
  ItemFlex,
  ItemTitle,
  StatusIcon,
  ActionButton,
  ActionButtonIcon,
  PaymentStatus,
  Title,
  TitleContent,
  TitleColumn,
  ItemContentSize,
  ItemStatus,
  ItemValue,
  ItemEmployeesTotal,
  ItemEmployees,
  ItemRows,
  ItemRowsLabel,
  ContainerHeader,
  ItemTitleLink,
  Button,
  StatusLabel,
  ContainerButton,
  BorderVertical,
  ItemLabel,
  ItemCard,
} from "./OrderCardDetails.styles";
import DropdownCostCenters from "./DropdownCostCenters";

const OrderCardDetails = ({
  index,
  order: { date: orderDate, id: orderId, centralized },
  orderHeaderDetail: {
    requirer,
    employeesTotal,
    numberOfEmployeesWithCredit,
    numberNewCards,
    macAlimentacao,
    macRefeicao,
    macnai,
    amountmacefit,
    amount,
    discount,
    rebate,
    showRebate,
    taxes,
    hasTaxes,
    showCostCenter,
  },
  status: { description, hasAction, actionIcon, buttonText, iconColor },
  paymentStatus: { description: paymentDescription, color: paymentColor },
  action,
  toggleButtonAction,
  toggleButton,
  triggerRef,
  toggleDocs,
  invoice,
  handleChangeDropdownVisibility,
  isUnifiedInvoice,
  showTaxesSummaryModal,
}) => {
  const canDownloadDocuments = () =>
    centralized && !isUnifiedInvoice && invoice.showDocuments;

  return (
    <Container id={`order_card_${index}`} orderDate={orderDate}>
      <ContainerHeader>
        <div>
          <TitleColumn>
            <Title>Pedido</Title>
            <TitleContent id={`order_card_order_id_${index}`}>
              {orderId}
            </TitleContent>
          </TitleColumn>
          <ItemCard defaultCursor={!orderDate}>
            <Item defaultCursor={!orderDate}>
              <ItemTitle>Número total de funcionários do pedido:</ItemTitle>
              <ItemEmployeesTotal>
                <div>
                  <ItemEmployees>{employeesTotal}</ItemEmployees>
                  <ItemLabel>Total</ItemLabel>
                </div>
                <div>
                  <ItemEmployees>{numberOfEmployeesWithCredit}</ItemEmployees>
                  <ItemLabel>Com Crédito Ativos</ItemLabel>
                </div>
                <div>
                  <ItemEmployees>{numberNewCards}</ItemEmployees>
                  <ItemLabel>Cartões Novos</ItemLabel>
                </div>
              </ItemEmployeesTotal>
            </Item>
          </ItemCard>
        </div>
        <BorderVertical>
          <div />
        </BorderVertical>
        <div>
          <TitleColumn>
            {canDownloadDocuments() && (
              <ClickOutsideListener
                id="order_card_click_outside_id_dropdown"
                handleClickOutside={handleChangeDropdownVisibility}
                isListening={toggleDocs}
                triggerRef={triggerRef}
              >
                <ItemTitleLink>
                  <Button
                    id={`show_docs_${index}`}
                    imgSrc="arrowDown"
                    imgColor={blue}
                    imgWidth={20}
                    buttonType="link"
                    value="Ver documentos financeiros"
                    onClick={handleChangeDropdownVisibility}
                  />
                  <If test={toggleDocs}>
                    {showCostCenter ? (
                      <DropdownCostCenters
                        invoice={invoice}
                        orderId={orderId}
                      />
                    ) : (
                      <DropdownFiles
                        invoice={invoice}
                        handleChangeDropdownVisibility={
                          handleChangeDropdownVisibility
                        }
                      />
                    )}
                  </If>
                </ItemTitleLink>
              </ClickOutsideListener>
            )}
          </TitleColumn>
          <ItemCard defaultCursor={!orderDate}>
            <Item defaultCursor={!orderDate}>
              <ItemRowsLabel color>Requisitante:</ItemRowsLabel>
              <ItemRows fontWeight="true">{requirer}</ItemRows>
              <ItemRowsLabel color>Data do Pedido:</ItemRowsLabel>
              <ItemRows fontWeight="true">
                {orderDate
                  ? DateManager.utc(orderDate).format(
                      dateHourFormats.longNodeDateHour,
                    )
                  : "-"}
              </ItemRows>
            </Item>
          </ItemCard>
        </div>
        <BorderVertical>
          <div />
        </BorderVertical>
        <div>
          <TitleColumn />
          <ItemCard defaultCursor={!orderDate}>
            <ItemStatus>
              <ItemTitle>Status Pedido:</ItemTitle>
              <StatusIcon
                alt={description}
                title={description}
                id={`order_card_status_icon_${index}`}
              >
                <StatusLabel iconColor={iconColor}>{description}</StatusLabel>
                {hasAction && !toggleButton && (
                  <ActionButtonIcon
                    id={`action_${index}`}
                    onClick={toggleButtonAction}
                  >
                    <SvgIcon name={actionIcon} fill={iconColor} />
                  </ActionButtonIcon>
                )}
                {toggleButton && (
                  <ActionButtonIcon
                    id={`action_${index}`}
                    onClick={toggleButtonAction}
                  >
                    <SvgIcon name={actionIcon} fill={iconColor} />
                    <ContainerButton>
                      <ClickOutsideListener
                        id={`outside_action_button_${index}`}
                        handleClickOutside={toggleButtonAction}
                        isListening={toggleButton}
                        triggerRef={triggerRef}
                      >
                        <ActionButton
                          id={`action_button_${index}`}
                          onClick={trackEvent(
                            `Clicou em ${buttonText} no pedido ${orderId} centralizado`,
                            action(orderId),
                          )}
                        >
                          {buttonText}
                        </ActionButton>
                      </ClickOutsideListener>
                    </ContainerButton>
                  </ActionButtonIcon>
                )}
              </StatusIcon>
              <ItemTitle>Status Pagamento:</ItemTitle>
              <PaymentStatus
                color={paymentColor}
                id={`order_card_payment_status_${index}`}
              >
                {paymentDescription || "-"}
              </PaymentStatus>
            </ItemStatus>
          </ItemCard>
        </div>
        <BorderVertical>
          <div />
        </BorderVertical>
        <div>
          <TitleColumn>
            <Item defaultCursor={!orderDate}>
              <Title>Valores do pedido </Title>
            </Item>
          </TitleColumn>
          <ItemCard>
            <ItemFlex>
              <ItemContentSize>
                <ItemTitle>mac alimentação</ItemTitle>
              </ItemContentSize>
              <ItemValue
                left={9}
                id={`order_card_alimentacao_value_${index}`}
                fontWeight="true"
              >
                {macAlimentacao}
              </ItemValue>
            </ItemFlex>
            <ItemFlex>
              <ItemContentSize>
                <ItemTitle>mac refeição</ItemTitle>
              </ItemContentSize>
              <ItemValue
                left={9}
                id={`order_card_refeicao_value_${index}`}
                fontWeight="true"
              >
                {macRefeicao}
              </ItemValue>
            </ItemFlex>
            {featureFlag.enablemacnai() && (
              <ItemFlex>
                <ItemContentSize>
                  <ItemTitle>mac flex</ItemTitle>
                </ItemContentSize>
                <ItemValue
                  left={9}
                  id={`order_card_flex_value_${index}`}
                  fontWeight="true"
                >
                  {macnai}
                </ItemValue>
              </ItemFlex>
            )}
            <ItemFlex borderBottom defaultCursor={!orderDate}>
              <ItemContentSize>total macefício</ItemContentSize>
              <ItemContent id={`order_card_value_${index}`}>
                <div>{amountmacefit}</div>
              </ItemContent>
            </ItemFlex>
            <ItemFlex>
              <ItemContentSize>
                <ItemTitle>desconto</ItemTitle>
              </ItemContentSize>
              <ItemValue
                id={`order_card_discount_value_${index}`}
                fontWeight="true"
              >
                {discount}
              </ItemValue>
            </ItemFlex>
            {showRebate && (
              <ItemFlex>
                <ItemContentSize>
                  <ItemTitle>rebate</ItemTitle>
                </ItemContentSize>
                <ItemValue
                  id={`order_card_rebate_value_${index}`}
                  fontWeight="true"
                >
                  {rebate}
                </ItemValue>
              </ItemFlex>
            )}
            <ItemFlex borderBottom>
              <ItemContentSize>
                <ItemTitle
                  isLink={hasTaxes}
                  onClick={hasTaxes ? showTaxesSummaryModal : null}
                >
                  taxas e tarifas
                </ItemTitle>
              </ItemContentSize>
              <ItemValue
                left={9}
                id={`order_card_taxes_value_${index}`}
                fontWeight="true"
              >
                {taxes}
              </ItemValue>
            </ItemFlex>
            <ItemFlex>
              <ItemContentSize>valor total</ItemContentSize>
              <ItemContent id={`order_card_total_value_${index}`}>
                <div>{amount}</div>
              </ItemContent>
            </ItemFlex>
          </ItemCard>
        </div>
      </ContainerHeader>
    </Container>
  );
};

OrderCardDetails.propTypes = {
  index: number.isRequired,
  order: shape({
    id: string,
    date: string,
    centralized: bool,
  }).isRequired,
  orderHeaderDetail: shape({
    numberNewCards: number,
    numberOfEmployeesWithCredit: number,
    macAlimentacao: string,
    macRefeicao: string,
    macnai: string,
    amountmacefit: string,
    amount: string,
    requirer: string,
    employeesTotal: number,
    discount: string,
    rebate: string,
    showRebate: bool,
    taxes: string,
    hasTaxes: bool,
    showCostCenter: bool,
  }).isRequired,
  action: func,
  status: shape({
    icon: string,
    description: string,
    hasAction: bool,
    actionIcon: string,
    buttonText: string,
  }),
  toggleDocs: bool,
  paymentStatus: shape({
    description: string,
    color: string,
  }),
  toggleButtonAction: func,
  toggleButton: bool,
  triggerRef: shape({}),
  invoice: {},
  handleChangeDropdownVisibility: func.isRequired,
  isUnifiedInvoice: bool,
  showTaxesSummaryModal: func.isRequired,
};

OrderCardDetails.defaultProps = {
  action: () => undefined,
  toggleButtonAction: () => undefined,
  status: {},
  paymentStatus: {},
  toggleButton: false,
  toggleDocs: false,
  triggerRef: {},
  invoice: {},
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

export default connect(mapStateToProps, null)(OrderCardDetails);
