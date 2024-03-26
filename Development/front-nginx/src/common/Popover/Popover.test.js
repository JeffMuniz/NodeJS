import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Popover from "./Popover.js";

const props = {
  showPopover: false,
  preferPlace: "x",
  place: "y",
  id: "id",
  onMouseOut: jest.fn(),
  onMouseOver: jest.fn(),
  onBlur: jest.fn(),
  onFocus: jest.fn(),
};
describe("Popover", () => {
  it("should render it with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <Popover {...props}>
        <div id="test">Test</div>
      </Popover>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
