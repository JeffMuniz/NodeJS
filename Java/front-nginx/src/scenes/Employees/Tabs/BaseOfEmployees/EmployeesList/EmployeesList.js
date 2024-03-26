import React, { Fragment } from "react";
import { oneOfType, arrayOf, shape, string, number } from "prop-types";

import { CPF } from "cpf_cnpj";

import { toOnlyNumbers } from "@utils";
import {
  TableHeader,
  TableHeaderCol,
  TableRow,
  TableCol,
  // EditButton,
} from "@base";

import {
  // ButtonActions,
  EmployeeNumber,
  RouterLink,
  AddressCol,
} from "./EmployeesList.style";

const EmployeesList = ({ data, currentPage }) => (
  <Fragment>
    <TableHeader id="employee_list_header">
      <TableHeaderCol md={2} id="employee_list_header_employee">
        Funcionário
      </TableHeaderCol>
      <TableHeaderCol md={2} id="employee_list_header_cpf">
        CPF
      </TableHeaderCol>
      <TableHeaderCol md={2} id="employee_list_header_registry">
        Matrícula
      </TableHeaderCol>
      <TableHeaderCol md={2} id="employee_list_header_birth_date">
        Data Nasc.
      </TableHeaderCol>
      <TableHeaderCol md={3} id="employee_list_header_delivery_address">
        Local de Entrega
      </TableHeaderCol>
      <TableHeaderCol md={1} id="employee_list_header_delivery_address">
        Status
      </TableHeaderCol>
      {/* <TableHeaderCol md={1} id="employee_list_header_edit_button" /> */}
    </TableHeader>
    {data.map((employee, index) => (
      <TableRow
        id={`employee_list_row_${toOnlyNumbers(employee.cpf)}`}
        key={`${employee.number}${employee.cpf}${index}`}
      >
        <TableCol md={2}>
          <RouterLink
            id={`employee_${index}`}
            to={{
              pathname: `/funcionarios/extrato-funcionario/${toOnlyNumbers(
                employee.cpf,
              )}`,
              state: { page: currentPage - 1, status: employee.status },
            }}
            title={employee.name}
          >
            {employee.name}
          </RouterLink>
        </TableCol>
        <TableCol md={2} id={`employee_cpf_${index}`}>
          {CPF.format(employee.cpf)}
        </TableCol>
        <EmployeeNumber md={2}>
          <span id={`employee_registry_${index}`}>{employee.number}</span>
        </EmployeeNumber>
        <TableCol md={2} id={`employee_birth_date_${index}`}>
          {employee.birthday}
        </TableCol>
        <AddressCol md={3} id={`employee_delivery_address_${index}`}>
          {employee.address}
        </AddressCol>
        <TableCol md={1} id={`employee_birth_date_${index}`}>
          {employee.status}
        </TableCol>
        {/* <ButtonActions md={1} /> */}
      </TableRow>
    ))}
  </Fragment>
);

EmployeesList.propTypes = {
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
  currentPage: number.isRequired,
  // editUser: func,
};

EmployeesList.defaultProps = {
  data: [],
  // editUser: () => null,
};

export default EmployeesList;
