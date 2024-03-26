import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import UsersRegistry from "./UsersRegistry";

jest.mock("@common", () => ({
  TextInput: "TextInput",
  FormGroup: "FormGroup",
  Stepper: "Stepper",
  Button: "Button",
}));

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));

jest.mock("./CreateUserForm/CreateUserForm.container", () => "CreateUserForm");
jest.mock(
  "./CreateAccessForm/CreateAccessForm.container",
  () => "CreateAccessForm",
);

const defaultProps = {
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  values: {
    cpf: "",
    name: "",
    email: "",
    birthDate: "",
  },
  errors: {
    cpf: "",
    name: "",
    email: "",
    birthDate: "",
  },
  touched: {
    cpf: false,
    name: false,
    email: false,
    birthDate: false,
  },
  progress: 0,
  formStep: 1,
  handleGoBack: jest.fn(),
  updateProgress: jest.fn(),
  changePage: jest.fn(),
  goToAcessPermissions: jest.fn(),
};

describe("Users Registry", () => {
  it("Should render UsersRegistry with default data", async () => {
    // given
    const renderer = new ShallowRenderer();
    // when
    await renderer.render(<UsersRegistry {...defaultProps} />);
    const result = await renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
