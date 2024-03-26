import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import CreatePassword from "./CreatePassword";

jest.mock("./Form/Form.container", () => "FormContainer");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Icon: "Icon",
  Button: "Button",
}));
jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));

describe("CreatePassword", () => {
  it("Should render CreatePassword", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<CreatePassword />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
