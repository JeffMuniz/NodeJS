import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import DropdownFilter from "./DropdownFilter";

jest.mock("@common", () => "DropdownFilter");
jest.mock("@common", () => ({ ClickOutsideListener: "DropdownFilter" }));

const defaultProps = {
  id: "TestDropdownFilter",
  options: [
    {
      value: 0,
      description: "Teste 1",
    },
    {
      value: 1,
      description: "Teste 2",
    },
  ],
  callback: () => null,
};

describe("DropdownFilter Container Component", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<DropdownFilter {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
