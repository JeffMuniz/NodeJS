import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

import EmptyState from "./EmptyState";
import { Button } from "./EmptyState.styles";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "Button",
}));

describe("Delivery Places - Empty State - Unit Tests", () => {
  const props = {
    hasGroupAccessLevel: true,
    openFileDialog: jest.fn(),
    onOpenFileDialogClick: jest.fn(),
  };

  it("Should render Empty State", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmptyState {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should display send sheet button if the user has group permission", () => {
    // when
    const customProps = {
      ...props,
      hasGroupAccessLevel: true,
    };

    const testRenderer = TestRenderer.create(<EmptyState {...customProps} />);

    // then
    expect(testRenderer.root.findAllByType(Button)).toHaveLength(1);
  });

  it("Should NOT display send sheet button if the user has NOT group permission", () => {
    // when
    const customProps = {
      ...props,
      hasGroupAccessLevel: false,
    };

    const testRenderer = TestRenderer.create(<EmptyState {...customProps} />);

    // then
    expect(testRenderer.root.findAllByType(Button)).toHaveLength(0);
  });
});
