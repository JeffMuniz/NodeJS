import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Employees from "./Employees";

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
  WithPagination: "WithPagination",
  TableCol: "TableCol",
  TableHeaderCol: "TableHeaderCol",
  OrderBy: "OrderComponent",
}));
jest.mock("./EmployeesList/EmployeesList", () => "EmployeesList");
jest.mock("./Employees.container", () => "EmployeesMain");

jest.mock("@common", () => ({
  Tabs: "Tabs",
  ValueLabelText: "ValueLabelText",
}));

const defaultProps = {
  employeesCount: { totalEmployees: 100, activeEmployees: 100 },
  employeeListRequestStatus: "none",
  updateEmployeesData: jest.fn(),
  selectedCompany: {},
  onClick: jest.fn(),
  employeeList: {},
  callback: jest.fn(),
  page: 1,
};

describe("Employees - Scene", () => {
  it("Should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Employees {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
