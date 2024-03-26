import React from "react";
import { warningTypes } from "@enums";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import { StyledButton } from "./Warning.styles";

import Warning from "./Warning";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "Button",
}));

const defaultProps = {
  id: "id",
  icon: "icon",
  children: <span>test</span>,
  type: warningTypes.ATTENTION_ALERT,
  button: {},
  showMe: true,
};

describe("Warning", () => {
  it("should render Warning with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Warning {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render Button if the is not Button props", () => {
    // given

    const button = {
      value: "lorem",
      onClick: jest.fn(),
    };

    const testRenderer = TestRenderer.create(
      <Warning {...defaultProps} button={button} />,
    );
    const instance = testRenderer.root;

    // when
    const result = instance.findAllByType(StyledButton);

    // then
    expect(result).toHaveLength(1);
  });

  it("should NOT render Button if the is not Button props", () => {
    // given
    const testRenderer = TestRenderer.create(<Warning {...defaultProps} />);
    const instance = testRenderer.root;

    // when
    const result = instance.findAllByType(StyledButton);

    // then
    expect(result).toHaveLength(0);
  });
});
