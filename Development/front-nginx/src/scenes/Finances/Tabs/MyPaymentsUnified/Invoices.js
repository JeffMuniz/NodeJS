import React from "react";
import PropTypes from "prop-types";
import Invoice from "./Invoice";
import { Table } from "./styles";

const Invoices = ({ invoices }) => (
  <Table>
    {invoices.map((invoice, index) => (
      <Invoice
        key={index}
        invoiceId={invoice.invoiceId}
        cnpj={invoice.cnpj}
        amount={invoice.amount}
        dueDate={invoice.dueDate}
        unificationType={invoice.unificationType}
        unificationTypeEnum={invoice.unificationTypeEnum}
        status={invoice.status}
        statusEnum={invoice.statusEnum}
        totalOrders={invoice.totalOrders}
        paymentType={invoice.paymentType}
        allowRpsDownload={invoice.allowRpsDownload}
        showDocuments={invoice.showDocuments}
        costCenter={invoice.costCenter}
      />
    ))}
  </Table>
);

Invoices.propTypes = {
  invoices: PropTypes.arrayOf(
    PropTypes.shape({
      invoiceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      cnpj: PropTypes.string,
      amount: PropTypes.string,
      dueDate: PropTypes.string,
      unificationType: PropTypes.string,
      unificationTypeEnum: PropTypes.string,
      status: PropTypes.string,
      statusEnum: PropTypes.string,
      totalOrders: PropTypes.number,
      paymentType: PropTypes.string,
      allowRpsDownload: PropTypes.bool,
      showDocuments: PropTypes.bool,
      costCenter: PropTypes.string,
    }),
  ),
};

Invoices.defaultProps = {
  invoices: [],
};

export default Invoices;
