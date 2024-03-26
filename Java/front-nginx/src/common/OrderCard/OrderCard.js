import React from "react";
import { shape, string, bool, func, number } from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";
import ClickOutsideListener from "src/common/ClickOutsideListener/ClickOutsideListener";
import { trackEvent } from "src/modules/Tracking";
import { toMoneyMask, If } from "@utils";
import { dateHourFormats } from "@enums";
import { SvgIcon } from "@common";

import {
  Container,
  Item,
  ItemButton,
  ItemContent,
  ItemTitle,
  ButtonDetails,
  ActionButton,
  ActionButtonIcon,
  OrderStatus,
  PaymentStatus,
  PaymentStatusTitle,
} from "./OrderCard.styles";

const OrderCard = ({
  index,
  order: { date: orderDate, id: orderId, amount, showErrorMessage },
  handleChangePage,
  status: {
    description,
    hasAction,
    actionIcon,
    buttonText,
    iconColor,
    color: orderColor,
  },
  paymentStatus: { description: paymentDescription, color: paymentColor },
  action,
  toggleButtonAction,
  toggleButton,
  triggerRef,
  validatingFileOrderStatus,
  pendingUserOrderStatus,
  showOptionsButton,
  handleOpenConfirmOrderPage,
}) => (
  <React.Fragment>
    <Container id={`order_card_${index}`} orderDate={showOptionsButton}>
      <Item>
        <ItemTitle>ID do Pedido</ItemTitle>
        <ItemContent id={`order_card_order_id_${index}`}>{orderId}</ItemContent>
      </Item>
      <Item minWidth="200px">
        <ItemTitle>Data de Criação</ItemTitle>
        <ItemContent id={`order_card_processing_date_${index}`}>
          {orderDate
            ? DateManager.utc(orderDate).format(
                dateHourFormats.longNodeDateHour,
              )
            : "-"}
        </ItemContent>
      </Item>
      <Item minWidth="150px">
        <ItemTitle>Valor do macefício</ItemTitle>
        <ItemContent id={`order_card_value_${index}`}>
          {validatingFileOrderStatus ? "-" : toMoneyMask(amount || 0)}
        </ItemContent>
      </Item>
      <Item onClick={e => e.stopPropagation()} minWidth="215px">
        <ItemTitle>Status do Pedido</ItemTitle>
        <OrderStatus color={orderColor} id={`order_card_order_status_${index}`}>
          {description || "-"}
          {hasAction && (
            <ActionButtonIcon
              id={`action_${index}`}
              onClick={toggleButtonAction}
            >
              <SvgIcon name={actionIcon} fill={iconColor} />
            </ActionButtonIcon>
          )}
          {hasAction && toggleButton && (
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
                  action(orderId, showErrorMessage),
                )}
              >
                {buttonText}
              </ActionButton>
            </ClickOutsideListener>
          )}
        </OrderStatus>
      </Item>
      <Item minWidth="250px">
        <PaymentStatusTitle>Status de Pagamento</PaymentStatusTitle>
        <PaymentStatus
          color={paymentColor}
          id={`order_card_payment_status_${index}`}
        >
          {!validatingFileOrderStatus && paymentDescription
            ? paymentDescription
            : "-"}
        </PaymentStatus>
      </Item>
      <ItemButton defaultCursor={showOptionsButton}>
        <If test={showOptionsButton}>
          <If test={pendingUserOrderStatus}>
            <ButtonDetails
              id={`action_details_button_${index}`}
              onClick={handleOpenConfirmOrderPage}
            >
              Confirmar
            </ButtonDetails>
          </If>
          <If test={!pendingUserOrderStatus}>
            <ButtonDetails
              id={`action_details_button_${index}`}
              onClick={handleChangePage(orderId)}
            >
              Detalhe
            </ButtonDetails>
          </If>
        </If>
      </ItemButton>
    </Container>
  </React.Fragment>
);

OrderCard.propTypes = {
  index: number.isRequired,
  order: shape({
    id: string,
    date: string,
    amount: string,
    status: string,
    requirer: string,
  }).isRequired,
  handleChangePage: func.isRequired,
  action: bool,
  status: shape({
    icon: string,
    description: string,
    hasAction: bool,
    actionIcon: string,
    buttonText: string,
  }),
  paymentStatus: shape({
    description: string,
    color: string,
  }),
  handleOpenConfirmOrderPage: func.isRequired,
  toggleButtonAction: func,
  toggleButton: bool,
  triggerRef: shape({}),
  validatingFileOrderStatus: bool,
  pendingUserOrderStatus: bool,
  showOptionsButton: bool,
};

OrderCard.defaultProps = {
  action: () => undefined,
  toggleButtonAction: () => undefined,
  status: {},
  paymentStatus: {},
  toggleButton: false,
  triggerRef: {},
  validatingFileOrderStatus: false,
  pendingUserOrderStatus: false,
  showOptionsButton: false,
};

export default OrderCard;
