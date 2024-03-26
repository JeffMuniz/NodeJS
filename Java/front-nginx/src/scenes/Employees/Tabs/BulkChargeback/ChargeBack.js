import React, { Fragment } from "react";
import { oneOfType, arrayOf, shape, string, number, func } from "prop-types";

import { TableHeader, TableRow } from "@base";

import { RouterLink, Text, TableHeaderCol } from "./styles.js";

const ChargeBack = ({ data, getColor, handleClick }) => (
  <Fragment>
    <TableHeader id="chargeback_header">
      <TableHeaderCol md={1} id="chargeback_header_id">
        ID
      </TableHeaderCol>
      <TableHeaderCol md={2} id="chargeback_header_datetime">
        Data / Hora
      </TableHeaderCol>
      <TableHeaderCol md={2} id="chargeback_header_qts_employee">
        Qts de Funcionários
      </TableHeaderCol>
      <TableHeaderCol md={1} id="chargeback_header_required_value">
        Solicitado
      </TableHeaderCol>
      <TableHeaderCol md={1} id="chargeback_header_charged_back_value">
        Estornado
      </TableHeaderCol>
      <TableHeaderCol md={2} id="chargeback_header_reason">
        Motivo
      </TableHeaderCol>
      <TableHeaderCol md={1} id="chargeback_header_status">
        Status
      </TableHeaderCol>
      <TableHeaderCol md={1} id="chargeback_header_status">
        Detalhe
      </TableHeaderCol>
    </TableHeader>
    {data.map((chargeback, index) => (
      <TableRow
        id={`chargeback_row_${chargeback.id}`}
        key={`${chargeback.number}${chargeback.cpf}${index}`}
      >
        <Text md={1}>
          <RouterLink
            id={`chargeback_${index}`}
            title={chargeback.id}
            onClick={handleClick}
          >
            {chargeback.id}
          </RouterLink>
        </Text>
        <Text md={2} id={`chargeback_date_${index}`}>
          {chargeback.requestDate}
        </Text>
        <Text md={2} id={`chargeback_qty_${index}`}>
          {chargeback.qty}
        </Text>
        <Text md={1} id={`chargeback_required_value_${index}`}>
          {chargeback.requestValue}
        </Text>
        <Text md={1} id={`chargeback_charged_back_value_${index}`}>
          {chargeback.chargebackValue}
        </Text>
        <Text md={2} id={`chargeback_reason_${index}`}>
          {chargeback.reason}
        </Text>
        <Text
          md={1}
          id={`chargeback_status_${index}`}
          fill={getColor(chargeback)}
        >
          {chargeback.status}
        </Text>

        <Text md={1}>
          <RouterLink
            id={`chargeback_${index}`}
            title={chargeback.id}
            onClick={handleClick}
          >
            Detalhe
          </RouterLink>
        </Text>
      </TableRow>
    ))}
  </Fragment>
);

ChargeBack.propTypes = {
  data: arrayOf(
    shape({
      name: string,
      email: string,
      cpf: string,
      address: string,
      birthday: string,
      number: oneOfType([number, string]),
    }),
  ),
  getColor: func.isRequired,
  handleClick: func.isRequired,
};

ChargeBack.defaultProps = {
  data: [],
};

export default ChargeBack;
