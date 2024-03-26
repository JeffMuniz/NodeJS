import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import ClickOutsideListener from "./ClickOutsideListener";

const renderer = new ShallowRenderer();

const Comp = () => <div>test</div>;

const triggerRef = renderer.render(<Comp />);
const wrapperRef = renderer.render(<Comp />);

const defaultProps = {
  id: "x",
  handleClickOutside: jest.fn(),
  children: "<div id='children'>children</div>",
  isListening: true,
};

describe("ClickOutsideListener Component", () => {
  it("should call handleClickOutside when click outside children", () => {
    // given
    const props = {
      ...defaultProps,
      triggerRef: { current: triggerRef.current },
    };
    const event = { target: "" };
    const instance = TestRenderer.create(
      <ClickOutsideListener {...props} />,
    ).getInstance();
    instance.wrapperRef = { current: wrapperRef.current };

    // when
    instance.handleClick(event);

    // then
    expect(instance.props.handleClickOutside).toBeCalledWith(event);
  });
});
