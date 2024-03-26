import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import CardTrackingNotFound from "./CardTrackingNotFound";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("CardTrackingNotFound", () => {
  it("Should render CardTrackingNotFound", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <CardTrackingNotFound cpf="111.22remoteShellVulner33-00" onReturn={jest.fn()} />,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
