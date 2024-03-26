import React from "react";
import TestRenderer from "react-test-renderer";

import PopoverContainer from "./Popover.container";

jest.mock("./Popover.js", () => "");

describe("Popover methods", () => {
  let testRenderer = null;
  let instance = null;

  beforeEach(() => {
    testRenderer = TestRenderer.create(<PopoverContainer />);
    instance = testRenderer.getInstance();
  });

  it("should show popover when onFocus is called", () => {
    // when
    instance.onFocus();

    // then
    expect(instance.state.showPopover).toBeTruthy();
  });

  it("should show popover when onMouseOver is called", () => {
    // when
    instance.onMouseOver();

    // then
    expect(instance.state.showPopover).toBeTruthy();
  });

  it("should not show popover when onBlur is called", () => {
    // when
    instance.onBlur();

    // then
    expect(instance.state.showPopover).toBeFalsy();
  });

  it("should not show popover when onMouseOut is called", () => {
    // when
    instance.onMouseOut();

    // then
    expect(instance.state.showPopover).toBeFalsy();
  });
});
