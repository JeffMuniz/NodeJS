import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import EmployeeNotFound from "./EmployeeNotFound";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Order", () => {
  it("Should render Order", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <EmployeeNotFound cpf="11122233344" onReturn={jest.fn()} />,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
