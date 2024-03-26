import React from "react";
import PropTypes from "prop-types";
import * as featureFlag from "@utils/featureFlag";
import { Table, Thead, Tbody, Th, Tr, Td } from "src/styles/table.styles";

const CreditsTab = ({ items }) => (
  <Table marginLess>
    <Thead>
      <Tr>
        <Th>Nome</Th>
        <Th>CPF</Th>
        <Th>Matrícula</Th>
        <Th>Status</Th>
        <Th>Crédito alimentação</Th>
        <Th>Crédito refeição</Th>
        {featureFlag.enablemacnai() && <Th>Crédito macnai</Th>}
      </Tr>
    </Thead>
    <Tbody>
      {items.map((credit, index) => (
        <Tr key={index}>
          <Td>{credit.nome}</Td>
          <Td>{credit.cpf}</Td>
          <Td>{credit.matricula}</Td>
          <Td>{credit.status}</Td>
          <Td>{credit.creditoVA}</Td>
          <Td>{credit.creditoVR}</Td>
          {featureFlag.enablemacnai() && <Td>{credit.creditoFlex}</Td>}
        </Tr>
      ))}
    </Tbody>
  </Table>
);

CreditsTab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

CreditsTab.defaultProps = {
  items: [],
};

export default CreditsTab;
