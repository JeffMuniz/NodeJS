import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import ProcessingWarning from "./ProcessingWarning";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Delivery Places - Processing Warning - Unit Tests", () => {
  it("Should render Processing Warning", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ProcessingWarning />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
