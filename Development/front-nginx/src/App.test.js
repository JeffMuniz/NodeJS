import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import App from "./App";

jest.mock("react-ga");
jest.mock("./routes/App.router", () => "AppRouter");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Container: "ContainerWrapper",
  Button: "BaseButton",
}));

describe("App", () => {
  it("Should render App", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<App />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
