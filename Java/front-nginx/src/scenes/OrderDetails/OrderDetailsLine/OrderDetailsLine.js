import React from "react";
import { func, shape, number, bool } from "prop-types";
import isEmpty from "lodash/isEmpty";

import { trackEvent } from "src/modules/Tracking";
import DateManager from "src/modules/DateManager/DateManager";
import { orderDetailsStatus, dateHourFormats } from "@enums";
import { ClickOutsideListener, SvgIcon } from "@common";
import { blue } from "@colors";
import { If } from "@utils";
import { Tr, Td } from "src/styles/table.styles";

import {
  Button,
  ActionButton,
  ActionButtonIcon,
  ChargeCancelledText,
  StatusIcon,
  StatusLabel,
} from "./OrderDetailsLine.styles";

const getStatusData = status =>
  Object.values(orderDetailsStatus).find(({ key }) => key === status) || null;

const chargeCancelled = status => {
  const data = getStatusData(status);
  const expired = orderDetailsStatus.EXPIRADO.key;
  const cancelled = orderDetailsStatus.PEDIDO_CANCELADO.key;
  return !isEmpty(data) && (data.key === cancelled || data.key === expired);
};

const checkStatus = status =>
  Object.keys(orderDetailsStatus)
    .filter(key => status.includes(key))
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = orderDetailsStatus[key];
      return obj;
    }, {});

const getCreditDate = date =>
  DateManager.utc(date).format(dateHourFormats.longDateSlash);

export const OrderDetailsLine = ({
  showCostCenter,
  order,
  handleClickOnChargeCancel,
  handleOrderDetailsByCompanyPress,
  hasAction,
  index,
  triggerRef,
  isButtonOpen,
  toggleButtonAction,
  key,
}) => {
  const transformStatus = checkStatus(order.status);

  return (
    <Tr id={`bo_header_${index}`} key={key}>
      <Td
        centered
        id={`bo_header_cnpj_${index}`}
        chargeCancelled={chargeCancelled(order.status)}
      >
        {order.cnpj}
      </Td>
      <Td
        centered
        id={`bo_header_employeesTotal_${index}`}
        chargeCancelled={chargeCancelled(order.status)}
      >
        {order.employeesTotal}
      </Td>
      {showCostCenter && (
        <Td
          centered
          id={`bo_header_cc_${index}`}
          chargeCancelled={chargeCancelled(order.status)}
        >
          {order.costCenter || "N/D"}
        </Td>
      )}
      <Td
        centered
        id={`bo_header_amount_${index}`}
        chargeCancelled={chargeCancelled(order.status)}
      >
        {order.amount}
      </Td>
      <Td centered>
        <StatusIcon
          id={`bo_header_credit_status_${index}`}
          data-status={transformStatus[order.status].description}
          title={transformStatus[order.status].description}
        >
          <StatusLabel color={transformStatus[order.status].color}>
            {transformStatus[order.status].description}
          </StatusLabel>
        </StatusIcon>
      </Td>
      <Td
        centered
        chargeCancelled={chargeCancelled(order.status)}
        id={`bo_header_credit_date_${index}`}
      >
        {getCreditDate(order.creditDate)}
      </Td>
      <Td centered>
        <If test={chargeCancelled(order.status)}>
          <ChargeCancelledText id={`show_order_details_${index}`}>
            ({order.status.toLowerCase()})
          </ChargeCancelledText>
        </If>
        <If test={!chargeCancelled(order.status)}>
          <Button
            id={`show_order_details_${index}`}
            imgSrc="search"
            imgColor={blue}
            imgWidth={24}
            buttonType="link"
            value="Ver detalhes"
            onClick={handleOrderDetailsByCompanyPress({
              orderId: order.orderId,
              chargeId: order.chargeId,
            })}
            action={`Visualizou detalhes do pedido ${order.orderId}`}
          />
        </If>
      </Td>
      <Td>
        <If test={hasAction}>
          <ActionButtonIcon id={`action_${index}`} onClick={toggleButtonAction}>
            <SvgIcon name="arrowDownBlack" />
          </ActionButtonIcon>
        </If>
        <If test={hasAction && isButtonOpen}>
          <ClickOutsideListener
            id={`outside_action_button_${index}`}
            handleClickOutside={toggleButtonAction}
            isListening={isButtonOpen}
            triggerRef={triggerRef}
          >
            <ActionButton
              id={`action_button_${index}`}
              onClick={trackEvent(
                `Clicou em Cancelar no pedido ${order.orderId} descentralizado`,
                handleClickOnChargeCancel({
                  chargeId: order.chargeId,
                  orderId: order.orderId,
                }),
              )}
            >
              Cancelar
            </ActionButton>
          </ClickOutsideListener>
        </If>
      </Td>
    </Tr>
  );
};

OrderDetailsLine.propTypes = {
  showCostCenter: bool,
  order: shape({}).isRequired,
  hasAction: bool.isRequired,
  index: number.isRequired,
  handleClickOnChargeCancel: func.isRequired,
  handleOrderDetailsByCompanyPress: func.isRequired,
  triggerRef: shape({}).isRequired,
  isButtonOpen: bool.isRequired,
  toggleButtonAction: func.isRequired,
  key: number.isRequired,
};

OrderDetailsLine.defaultProps = {
  showCostCenter: false,
};
