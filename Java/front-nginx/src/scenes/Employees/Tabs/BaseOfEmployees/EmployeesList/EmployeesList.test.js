import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import EmployeesList from "./EmployeesList.js";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));
jest.mock("@base", () => ({
  TableCol: "TableCol",
  Link: "Link",
  ContainerWrapper: "ContainerWrapper",
  WithPagination: "WithPagination",
  TableHeader: "TableHeader",
  TableHeaderCol: "TableHeaderCol",
  TableRow: "TableRow",
}));

describe("EmployeesList Component", () => {
  it("should render employees list", () => {
    // given
    const renderer = new ShallowRenderer();
    const employees = [
      {
        name: "Bruno Santiago Roedel",
        email: "broedel@macvisacard.com.br",
        cpf: "123.456.789-01",
        address: "Grupo Empresarial",
        birthday: "2000-11-01",
        number: "1123",
      },
      {
        name: "Bruno Santiago Roedel",
        email: "broedel@macvisacard.com.br",
        cpf: "123.456.789-04",
        address: "Grupo Empresarial",
        birthday: "2000-11-01",
        number: "1124",
      },
    ];

    // when
    renderer.render(<EmployeesList data={employees} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render default message when not pass data to employeesList component", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmployeesList />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
