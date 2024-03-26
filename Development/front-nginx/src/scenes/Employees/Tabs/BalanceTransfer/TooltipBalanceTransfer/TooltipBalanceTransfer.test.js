import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import TooltipBalanceTransfer from "./TooltipBalanceTransfer";

describe("Tooltip Balance Transfer - Unit Tests", () => {
  it("Should render Tooltip Balance Transfer", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<TooltipBalanceTransfer close={() => jest.fn()} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
