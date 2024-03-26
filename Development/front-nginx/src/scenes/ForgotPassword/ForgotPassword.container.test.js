import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import ForgotPasswordContainer from "./ForgotPassword.container";

jest.mock("@common", () => ({
  Unauthenticated: "Unauthenticated",
  SvgIcon: "SvgIcon",
  Button: "BaseButton",
}));
jest.mock("./Form/Form.container", () => "FormContainer");

const defaultProps = {
  goBack: jest.fn(),
  title: jest.fn(),
  subtitle: jest.fn(),
  text: jest.fn(),
};

describe("ForgotPassword", () => {
  it("Should render ForgotPassword", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ForgotPasswordContainer {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
