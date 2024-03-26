import React from "react";
import PropTypes from "prop-types";

import { FieldLabel } from "@common";

import { ContainerOrders, DetailButton, Row } from "./styles";

const OrdersList = ({
  orders,
  goToOrderDetailSecondLevel,
  goToOrderDetail,
}) => (
  <ContainerOrders>
    {orders.map((order, index) => (
      <Row key={index}>
        <FieldLabel label="ID do Pedido">
          <DetailButton
            id={`action_detail_button_${index}`}
            onClick={() => goToOrderDetailSecondLevel(order)}
            fontSize="16px"
            fontWeight="bold"
          >
            {order.orderId}
          </DetailButton>
        </FieldLabel>
        <FieldLabel label="CNPJ" value={order.cnpj} />
        <FieldLabel label="Data do Pedido" value={order.orderDate} />
        <FieldLabel label="Data do Crédito" value={order.creditDate} />
        <FieldLabel
          label="Valor do Pedido"
          value={order.amount}
          width="135px"
        />
        <FieldLabel
          label="Qtde. de Funcionários"
          value={order.totalEmployees}
        />
        <DetailButton
          id={`action_detail_button_${index}`}
          onClick={() => goToOrderDetail(order)}
        >
          Detalhes
        </DetailButton>
      </Row>
    ))}
  </ContainerOrders>
);

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.number,
      cnpj: PropTypes.string,
      orderDate: PropTypes.string,
      creditDate: PropTypes.string,
      amount: PropTypes.string,
      totalEmployees: PropTypes.number,
    }),
  ),
  goToOrderDetailSecondLevel: PropTypes.func.isRequired,
  goToOrderDetail: PropTypes.func.isRequired,
};

OrdersList.defaultProps = {
  orders: [],
};

export default OrdersList;
