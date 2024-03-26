import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import EmployeeDataSection from "./EmployeeDataSection";

const defaultProps = {
  name: "Augusto Serafim Soares",
  CPF: "123.456.789-99",
  registry: "48935600920",
  deliveryLocation: "123.456.789/0000-00",
  status: "ativo",
  onReturn: jest.fn(),
  onEdit: jest.fn(),
  onCancel: jest.fn(),
};

describe("Statement Section - Unit Test", () => {
  it("Should render Statement Section", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmployeeDataSection {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
