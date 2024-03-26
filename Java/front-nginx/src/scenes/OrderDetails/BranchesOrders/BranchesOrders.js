import React from "react";
import { arrayOf, shape, string, func, bool } from "prop-types";
import { Table, Thead, Tr, Th, Tbody } from "src/styles/table.styles";
import OrderDetailsLine from "../OrderDetailsLine/OrderDetailsLine.container";

const BranchesOrders = ({
  showCostCenter,
  data,
  handleOrderDetailsByCompanyPress,
  handleClickOnChargeCancel,
}) => (
  <Table>
    <Thead id="bo_header">
      <Tr>
        <Th centered id="bo_header_cnpj">
          CNPJ
        </Th>
        <Th centered id="bo_header_employees_total">
          Nº funcionários
        </Th>
        {showCostCenter && (
          <Th centered id="bo_header_cc">
            Centro de Custo
          </Th>
        )}
        <Th centered id="bo_header_amount">
          Valor Total
        </Th>
        <Th centered id="bo_header_credit_status">
          Status Crédito
        </Th>
        <Th centered id="bo_header_credit_date">
          Disponível em
        </Th>
        <Th width="165px" />
        <Th width="24px" />
      </Tr>
    </Thead>
    <Tbody>
      {data &&
        data.map((order, index) => {
          const hasAction = !!order.actions;

          return (
            <OrderDetailsLine
              {...{
                order,
                showCostCenter,
                hasAction,
                index,
                handleOrderDetailsByCompanyPress,
                handleClickOnChargeCancel,
              }}
              key={index}
            />
          );
        })}
    </Tbody>
  </Table>
);

BranchesOrders.propTypes = {
  showCostCenter: bool,
  data: arrayOf(
    shape({
      orderId: string,
      cnpj: string,
      totalEmployees: string,
      amount: string,
      status: string,
      chargeId: string,
      costCenter: string,
    }),
  ),
  handleOrderDetailsByCompanyPress: func.isRequired,
  handleClickOnChargeCancel: func.isRequired,
};

BranchesOrders.defaultProps = {
  showCostCenter: bool,
  data: null,
};

export default BranchesOrders;
