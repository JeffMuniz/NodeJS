import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { requestStatus } from "@enums";
import SuccessBody from "./SuccessBody";
import { ForgetPasswordContainer } from "./Form.container";

jest.mock("./SuccessBody", () => "SuccessBody");
jest.mock("./Form", () => "Form");
jest.mock("./Form.schema", () => "FormSchema");
jest.mock("src/modules/Form/Form", () => "FormWrapper");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Container: "ContainerWrapper",
  Button: "BaseButton",
}));

let testRenderer = null;
let instance = null;
let forgotPasswordData = { requestStatus: requestStatus.success };

const defaultProps = {
  forgotPasswordAction: jest.fn(),
  closeModal: jest.fn(),
  changeInputStatus: jest.fn(),
  showModal: false,
  children: jest.fn().mockReturnValue(null),
  resetAuth: jest.fn(),
  getCode: jest.fn(),
  forgotPasswordData: { requestStatus: requestStatus.success },
  resetForgotPassword: jest.fn(),
  toggleLoading: jest.fn(),
};

beforeEach(() => {
  testRenderer = TestRenderer.create(
    <ForgetPasswordContainer
      {...defaultProps}
      forgotPasswordData={forgotPasswordData}
    />,
  );
  instance = testRenderer.getInstance();
});

describe("Forgot Password - Container", () => {
  it("should call forgotPassword when submit", async () => {
    // when
    await instance.submit({
      forgotCpf: "123.456.789-00",
      email: "test@test.com",
    });

    // then
    expect(instance.props.forgotPasswordAction).toBeCalled();
  });

  it("should render SuccessBody when receiving a successful forgot password request", () => {
    // given
    forgotPasswordData = { requestStatus: requestStatus.success };

    // when
    testRenderer.update(
      <ForgetPasswordContainer
        {...defaultProps}
        forgotPasswordData={forgotPasswordData}
      />,
    );
    const newInstance = testRenderer.root;

    const result = newInstance.findAllByType(SuccessBody);

    // then
    expect(result).toHaveLength(1);
  });

  it("should not render SuccessBody when receiving a not successful forgot password request", () => {
    // given
    const renderer = new ShallowRenderer();

    const props = {
      ...defaultProps,
      forgotPasswordData: {
        requestStatus: requestStatus.error,
        error: { message: "error" },
      },
    };

    // when
    renderer.render(<ForgetPasswordContainer {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
