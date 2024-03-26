import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import OrderNew from "./OrderNew";

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  LinkButton: "LinkButton",
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
    await renderer.render(<OrderNew {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
