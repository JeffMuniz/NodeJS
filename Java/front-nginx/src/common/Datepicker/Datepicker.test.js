import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Datepicker from "./Datepicker";

describe("Datepicker", () => {
  it("Should render Datepicker", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Datepicker id="" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render Datepicker with value", () => {
    // given
    const renderer = new ShallowRenderer();
    const value = "2018-08-21T12:28:45.314Z";

    // when
    renderer.render(<Datepicker id="" value={value} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
