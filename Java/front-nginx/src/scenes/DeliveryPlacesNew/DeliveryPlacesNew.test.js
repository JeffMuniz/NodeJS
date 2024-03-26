import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import DeliveryPlacesNew from "./DeliveryPlacesNew";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));
jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));

describe("Delivery Places", () => {
  it("Should render empty dashboard", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<DeliveryPlacesNew />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
