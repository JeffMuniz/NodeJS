import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import FileConverter from "./FileConverter";

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "Button",
}));

const defaultProps = {
  navigator: {},
  history: {},
  goToDocumentModel: jest.fn(),
};

describe("Order", () => {
  it("Should render empty dashboard", async () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    await renderer.render(<FileConverter {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
