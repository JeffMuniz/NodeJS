import React from "react";
import TestRenderer from "react-test-renderer";
import { EmployeeListContainer, mapStateToProps } from "./Employees.container";

let wrapper;
let instance;
let props;
jest.mock("./Employees", () => "EmployeesMain");

beforeEach(() => {
  props = {
    employeeList: {},
    employeesCount: {},
    getEmployees: jest.fn(),
    getEmployeesCount: jest.fn(),
    selectedCompany: { id: 1 },
    employeeListRequestStatus: "none",
    resetCountData: jest.fn(),
    resetEmployeesData: jest.fn(),
    location: { state: { page: 1 } },
  };
  wrapper = TestRenderer.create(<EmployeeListContainer {...props} />);
  instance = wrapper.getInstance();
});

describe("Employees - Container", () => {
  it("should to be call getEmployees and getEmployeesCount action when getEmployees function is called", () => {
    // given
    // when
    instance.getEmployees({});
    // then
    expect(props.getEmployees).toBeCalledWith({
      companyId: 1,
      page: 1,
      status: 1,
    });
  });

  it("should to be call getEmployeesCount and getEmployees action when componentDidMount is called", () => {
    // given
    instance.updateEmployeesData = jest.fn();
    // when
    instance.componentDidMount();
    // then
    expect(instance.updateEmployeesData).toBeCalled();
  });

  it("should return a object with user from passed state", () => {
    // given
    const state = {
      employee: { employees: { data: [] }, employeesCount: { data: {} } },
      selectedCompanyTree: { selectedCompany: 1 },
    };
    const expected = {
      employeeList: state.employee.employees.data,
      employeesCount: state.employee.employeesCount.data,
      selectedCompany: 1,
    };
    // when
    const result = mapStateToProps(state);
    // then
    expect(result).toEqual(expected);
  });
});
