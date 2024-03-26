import React, { Fragment } from "react";
import { func, string, arrayOf, shape, number } from "prop-types";

import { OrderCard } from "@common";

import { Container } from "./OrdersDashboard.styles";

const OrdersDashboard = ({ data, navigator, fetchOrders, page }) => {
  const checkStatusPayment = data.filter(
    d => d.status && d.status.includes("CONFIRMACAO"),
  );

  return (
    <Container>
      {data && data.length ? (
        <Fragment>
          {data.map((order, index) => (
            <OrderCard
              index={index}
              key={order.id}
              order={order}
              ordersRequest={checkStatusPayment}
              navigator={navigator}
              fetchOrders={fetchOrders}
              page={page}
            />
          ))}
        </Fragment>
      ) : (
        <div>Não há pedidos</div>
      )}
    </Container>
  );
};

OrdersDashboard.propTypes = {
  data: arrayOf(
    shape({
      id: string,
      date: string,
      amount: string,
      status: string,
      paymentStatus: string,
      requirer: string,
      cnpj: string,
    }),
  ),
  fetchOrders: func,
  page: number,
};

OrdersDashboard.defaultProps = {
  data: [],
  fetchOrders: () => [],
  page: 0,
};

export default OrdersDashboard;
