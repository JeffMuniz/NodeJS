import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { IconHeart } from "@assets";
import SvgIcon from "./SvgIcon";

describe("Icon - Component", () => {
  it("Should render icon when prop name is passed", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<SvgIcon name="information" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render icon when prop icon is passed", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<SvgIcon icon={IconHeart} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
