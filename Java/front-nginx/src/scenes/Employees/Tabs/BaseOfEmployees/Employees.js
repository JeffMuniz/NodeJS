import React from "react";
import { func, number, shape, arrayOf, oneOf } from "prop-types";

import { requestStatus } from "@enums";

import { WithPagination } from "@base";

import { toNumberMask } from "@utils";

import {
  ValueLabelRow,
  ValueLabelDiv,
  ValueLabelTextStyled,
} from "./Employees.styles";
import EmployeesList from "./EmployeesList/EmployeesList";

const statuses = Object.values(requestStatus);

const fieldsToFilterBy = [
  {
    key: "cpf",
    description: "nº do CPF",
    optionDescription: "CPF",
    mask: "cpf",
  },
  { key: "name", description: "Nome" },
];

const fieldsToFilterByStatus = [
  { key: 1, description: "Ativos", label: "status" },
  { key: 2, description: "Inativos", label: "status" },
  { key: 0, description: "Todos", label: "status" },
];

export const EmployeesMain = ({
  employeesCount,
  employeeList,
  callback,
  employeeListRequestStatus,
  selectedCompany,
  page,
}) => (
  <div>
    <ValueLabelRow>
      <ValueLabelDiv>
        <ValueLabelTextStyled
          id="e_total_employees"
          title={toNumberMask(employeesCount.totalEmployees || 0)}
          subtitle="funcionários"
        />
        <ValueLabelTextStyled
          id="e_active_employees"
          title={toNumberMask(employeesCount.activeEmployees || 0)}
          subtitle="ativos"
        />
        <ValueLabelTextStyled
          id="e_active_employees"
          title={toNumberMask(employeesCount.inactiveEmployees || 0)}
          subtitle="inativos"
        />
      </ValueLabelDiv>
    </ValueLabelRow>
    <WithPagination
      data={employeeList}
      fieldsToFilterBy={fieldsToFilterBy}
      showSearchInput
      showFilterDropdownGeneric
      fieldsToFilterDropdownGeneric={fieldsToFilterByStatus}
      callback={callback}
      itemsPerPage={10}
      status={employeeListRequestStatus}
      selectedCompany={selectedCompany}
      showLoading
      currentPage={page}
      render={props => <EmployeesList data={employeeList.content} {...props} />}
    />
  </div>
);

EmployeesMain.propTypes = {
  employeesCount: shape({}).isRequired,
  employeeList: shape({
    totalItems: number,
    content: arrayOf(shape({})),
  }).isRequired,
  callback: func.isRequired,
  employeeListRequestStatus: oneOf(statuses).isRequired,
  selectedCompany: shape({
    id: number,
  }),
  page: number.isRequired,
};

EmployeesMain.defaultProps = {
  selectedCompany: {
    id: null,
    name: "",
    cnpj: "",
    description: "",
    value: "",
  },
};
export default EmployeesMain;
