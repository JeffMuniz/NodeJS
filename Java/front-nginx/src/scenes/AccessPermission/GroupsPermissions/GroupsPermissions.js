import React from "react";
import { arrayOf, shape, func, number, bool } from "prop-types";

import { Row } from "react-styled-flexboxgrid";
import { CPF } from "cpf_cnpj";

import { TableHeader, TableHeaderCol, TableRow, TableCol } from "@base";
import { If } from "@utils";

import {
  StyledTableHeaderCol,
  StyledTableCol,
  ButtonDetails,
} from "./GroupsPermissions.styles";

export const Groups = ({
  users,
  totalItems,
  history,
  handleNavigateToEditUser,
  hasGroupAccessLevel = true,
}) => (
  <div id="access-group-list">
    <TableHeader between="xs" id="access-permissions-header">
      <TableHeaderCol md={3}>Nome Completo</TableHeaderCol>
      <StyledTableHeaderCol md={2}>CPF</StyledTableHeaderCol>
      <StyledTableHeaderCol md={3}>E-mail</StyledTableHeaderCol>
      <StyledTableHeaderCol md={2}>Status</StyledTableHeaderCol>
      <StyledTableHeaderCol md={1} />
    </TableHeader>
    {users.length ? (
      users.map(user => (
        <TableRow key={user.id} id={`access-permissions-list-item-${user.id}`}>
          <TableCol md={3}>
            <If test={hasGroupAccessLevel}>
              <ButtonDetails
                id={`btn_detail_employee_${user.id}_name`}
                onClick={handleNavigateToEditUser(history, user, totalItems)}
              >
                {user.name}
              </ButtonDetails>
            </If>
            <If test={!hasGroupAccessLevel}>{user.name}</If>
          </TableCol>
          <StyledTableCol md={2}>{CPF.format(user.cpf)}</StyledTableCol>
          <StyledTableCol md={3}>{user.email}</StyledTableCol>
          <StyledTableCol md={2} capitalize="true">
            {user.status}
          </StyledTableCol>
          <StyledTableCol md={1}>
            <If test={hasGroupAccessLevel}>
              <ButtonDetails
                id={`btn_detail_employee_${user.id}`}
                onClick={handleNavigateToEditUser(history, user, totalItems)}
              >
                Detalhe
              </ButtonDetails>
            </If>
          </StyledTableCol>
        </TableRow>
      ))
    ) : (
      <Row center="xs">
        <span id="access-permissions-group-list-not-found">
          Nenhum funcionário encontrado
        </span>
      </Row>
    )}
  </div>
);

Groups.propTypes = {
  users: arrayOf(shape({})).isRequired,
  history: shape({}).isRequired,
  handleNavigateToEditUser: func,
  totalItems: number.isRequired,
  hasGroupAccessLevel: bool,
};

Groups.defaultProps = {
  handleNavigateToEditUser: () => undefined,
  hasGroupAccessLevel: true,
};

export default Groups;
