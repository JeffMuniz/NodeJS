import React from "react";
import { arrayOf, shape } from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";
import { Table, Thead, Tbody, Th, Tr, Td } from "src/styles/table.styles";

import { productTypes, dateHourFormats } from "@enums";

const CardTrackingList = ({ vouchers }) => (
  <Table>
    <Thead>
      <Tr>
        <Th width="80px">Dt. solicitação</Th>
        <Th width="220px">Nome</Th>
        <Th centered width="50px">
          Produto
        </Th>
        <Th width="140px">Nº do Cartão</Th>
        <Th width="100px">Status do cartão</Th>
        <Th>Endereço</Th>
        <Th>Status da entrega</Th>
      </Tr>
    </Thead>
    <Tbody>
      {vouchers.length &&
        vouchers.map((card, index) => (
          <Tr key={index}>
            <Td>
              {DateManager.utc(card.issueDate).format(
                dateHourFormats.shortDateSlash,
              )}
            </Td>
            <Td>{card.printedName}</Td>
            <Td centered>{productTypes[card.idProduct].abbreviation}</Td>
            <Td>{card.cardNumber}</Td>
            <Td>
              <strong>{card.nomeStatus}</strong>
            </Td>
            <Td>{card.address}</Td>
            <Td>{card.trackStatus}</Td>
          </Tr>
        ))}
    </Tbody>
  </Table>
);

CardTrackingList.propTypes = {
  vouchers: arrayOf(shape({})),
};

CardTrackingList.defaultProps = {
  vouchers: [],
};

export default CardTrackingList;
