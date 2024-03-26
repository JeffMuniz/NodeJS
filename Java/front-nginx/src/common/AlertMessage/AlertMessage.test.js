import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import { Message, Footer } from "./AlertMessage.styles";

import AlertMessage from "./AlertMessage";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "Button",
}));

const defaultProps = {
  title: "Lorem",
  iconName: "Ipsum",
};

describe("AlertMessage", () => {
  it("Should render AlertMessage", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<AlertMessage {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render Message if a message prop is present", () => {
    // given
    const testRenderer = TestRenderer.create(
      <AlertMessage {...defaultProps} message="Hello" />,
    );
    const instance = testRenderer.root;
    const message = instance.findAllByType(Message);

    // then
    expect(message).toHaveLength(1);
  });

  it("Should not render Message if a message prop is not present", () => {
    // given
    const testRenderer = TestRenderer.create(
      <AlertMessage {...defaultProps} />,
    );
    const instance = testRenderer.root;
    const message = instance.findAllByType(Message);

    // then
    expect(message).toHaveLength(0);
  });

  it("Should render Footer if a buttonText prop is present", () => {
    // given
    const testRenderer = TestRenderer.create(
      <AlertMessage {...defaultProps} buttonText="Click me" />,
    );
    const instance = testRenderer.root;
    const footer = instance.findAllByType(Footer);

    // then
    expect(footer).toHaveLength(1);
  });

  it("Should not render Footer if a buttonText prop is not present", () => {
    // given
    const testRenderer = TestRenderer.create(
      <AlertMessage {...defaultProps} />,
    );
    const instance = testRenderer.root;
    const footer = instance.findAllByType(Footer);

    // then
    expect(footer).toHaveLength(0);
  });
});
