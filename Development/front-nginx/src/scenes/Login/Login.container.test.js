import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import LoginContainer from "./Login.container";

jest.mock("@common", () => ({
  Unauthenticated: "Unauthenticated",
  SvgIcon: "SvgIcon",
  FormGroup: "FormGroup",
  TextInput: "TextInput",
  Button: "Button",
}));

const defaultProps = {
  history: {},
  location: {},
};

describe("LoginContainer", () => {
  it("Should render LoginContainer", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<LoginContainer {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
