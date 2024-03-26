import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import { WebPaths, Routes } from "../../routes/consts";
import { Item } from "./ProgressBar.styles";

import ProgressBar from "./ProgressBar";

jest.mock("src/routes/navigate");

const defaultProps = {
  navigator: {
    location: {
      pathname: WebPaths[Routes.USERS_REGISTRY],
    },
  },
};

describe("Progress Bar - Unit Tests", () => {
  it("should render progress bar with default props", () => {
    // given
    const renderer = new ShallowRenderer();
    // when
    renderer.render(<ProgressBar {...defaultProps} />);
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });

  it("should redirect to another step when a diferent one got cllicked", () => {
    // given
    const renderer = TestRenderer.create(<ProgressBar {...defaultProps} />);
    const instanceRoot = renderer.root;
    // eslint-disable-next-line prefer-destructuring
    const item = instanceRoot.findAllByType(Item)[0];
    instanceRoot.instance.handleItemClick = jest.fn();
    // when
    item.props.onClick();
    // then
    expect(instanceRoot.instance.handleItemClick).toBeCalled();
  });

  it("should change state when handleItemClick got cllicked", () => {
    // given
    const instance = TestRenderer.create(
      <ProgressBar {...defaultProps} />,
    ).getInstance();
    // when
    instance.handleItemClick({
      route: "",
      name: "Sua entrega",
      position: 5,
    });
    // then
    expect(instance.state.currentStep.position).toBe(5);
  });
});
