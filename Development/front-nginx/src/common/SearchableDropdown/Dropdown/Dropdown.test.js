import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Dropdown from "./Dropdown";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  TextInput: "TextInput",
}));

const defaultProps = {
  options: [
    {
      value: 1,
      description: "test_1",
    },
    {
      value: 2,
      description: "test_2",
    },
  ],
  onSelect: jest.fn(() => jest.fn()),
  onFilterOptions: jest.fn(),
};

describe("SearchableDropdown", () => {
  it("should dropdown with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Dropdown {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
