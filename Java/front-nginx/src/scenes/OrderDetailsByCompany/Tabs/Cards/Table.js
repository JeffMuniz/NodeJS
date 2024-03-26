import React from "react";
import PropTypes from "prop-types";
import * as featureFlag from "@utils/featureFlag";
import { Table, Thead, Tbody, Th, Tr, Td } from "src/styles/table.styles";

const CardsTab = ({ items }) => (
  <Table marginLess>
    <Thead>
      <Tr>
        <Th>Nome</Th>
        <Th>CPF</Th>
        <Th>Matrícula</Th>
        <Th>Local de entrega</Th>
        <Th>VA</Th>
        <Th>VR</Th>
        {featureFlag.enablemacnai() && <Th>Flex</Th>}
      </Tr>
    </Thead>
    <Tbody>
      {items.map((card, index) => (
        <Tr key={index}>
          <Td>{card.nome}</Td>
          <Td>{card.cpf}</Td>
          <Td>{card.matricula}</Td>
          <Td>{card.localEntrega}</Td>
          <Td>{card.va}</Td>
          <Td>{card.vr}</Td>
          {featureFlag.enablemacnai() && <Td>{card.flex}</Td>}
        </Tr>
      ))}
    </Tbody>
  </Table>
);

CardsTab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

CardsTab.defaultProps = {
  items: [],
};

export default CardsTab;
