import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { func, shape, number, arrayOf, oneOf } from "prop-types";
import { isNil } from "lodash";

import * as EmployeesActions from "src/redux/modules/employee/actions/employee";

import { requestStatus as RequestStatus } from "@enums";

import { toOnlyNumbers } from "@utils";

import EmployeesMain from "./Employees";

const statuses = Object.values(RequestStatus);
const EMPLOYEES_COUNT_DEFAULT = { totalEmployees: 0, activeEmployees: 0 };

export class EmployeeListContainer extends Component {
  componentDidMount() {
    this.updateEmployeesData();
  }

  componentDidUpdate(prevProps) {
    const {
      selectedCompany: { id: prevCompanyId },
    } = prevProps;
    const {
      selectedCompany: { id: selectedCompanyId },
    } = this.props;

    if (prevCompanyId !== selectedCompanyId) {
      if (!selectedCompanyId) {
        this.resetData();
        return;
      }

      this.updateEmployeesData();
    }
  }

  getEmployees = (args = {}) => {
    const {
      getEmployees,
      selectedCompany: { id: companyId = 0 },
    } = this.props;

    if (Object.keys(args).includes("cpf")) {
      getEmployees({
        ...args,
        cpf: toOnlyNumbers(args.cpf),
        companyId,
      });
      return;
    }

    getEmployees({ ...args, companyId });
  };

  updateEmployeesData = () => {
    const {
      selectedCompany: { id: companyId = 0 },
      getEmployees,
      getEmployeesCount,
      location: { state },
    } = this.props;

    const { page } = state || 0;

    getEmployees({ companyId, page, status: 1 });
    getEmployeesCount({ companyId });
  };

  resetData = () => {
    const { resetCountData, resetEmployeesData } = this.props;
    resetCountData();
    resetEmployeesData();
  };

  render() {
    const {
      employeesCount,
      location: { state },
      employeeList,
      employeeListRequestStatus,
      selectedCompany,
    } = this.props;

    const page = !isNil(state) && state.page ? state.page + 1 : 1;

    return (
      <EmployeesMain
        employeesCount={employeesCount}
        page={page}
        employeeList={employeeList}
        callback={this.getEmployees}
        employeeListRequestStatus={employeeListRequestStatus}
        selectedCompany={selectedCompany}
        updateEmployeesData={this.updateEmployeesData}
      />
    );
  }
}

export const mapStateToProps = ({
  employee: {
    employees: { data: list, requestStatus },
    employeesCount: { data },
  },
  selectedCompanyTree: { selectedCompany },
}) => ({
  employeeList: list,
  employeesCount: data,
  employeeListRequestStatus: requestStatus,
  selectedCompany,
});

export const mapDispatchToProps = {
  getEmployees: EmployeesActions.getEmployees,
  getEmployeesCount: EmployeesActions.getEmployeesCount,
  resetCountData: EmployeesActions.resetCountAction,
  resetEmployeesData: EmployeesActions.resetEmployeesAction,
};

EmployeeListContainer.propTypes = {
  getEmployees: func.isRequired,
  employeeList: shape({
    content: arrayOf(shape()),
    totalItems: number,
  }),
  employeesCount: shape(),
  getEmployeesCount: func.isRequired,
  employeeListRequestStatus: oneOf(statuses).isRequired,
  selectedCompany: shape({
    id: number,
  }),
  resetCountData: func.isRequired,
  resetEmployeesData: func.isRequired,
  location: shape({
    state: shape({}),
  }),
};

EmployeeListContainer.defaultProps = {
  employeeList: {},
  employeesCount: EMPLOYEES_COUNT_DEFAULT,
  selectedCompany: { id: 0 },
  location: {
    state: {},
  },
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeListContainer),
);
