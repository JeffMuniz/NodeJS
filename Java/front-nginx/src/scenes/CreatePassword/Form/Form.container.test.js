import React from "react";
import TestRenderer from "react-test-renderer";
import { requestStatus } from "@enums";

import { FormContainer, mapStateToProps } from "./Form.container";

jest.mock("../../../routes/navigate");
jest.mock("src/modules/Form/Form", () => "FormWrapper");
jest.mock("./Form.schema", () => "FormSchema");
jest.mock("./Form", () => "Form");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

let createPasswordDataFromState = {};
let testRenderer = null;
let instance = null;
let props = null;

beforeEach(() => {
  createPasswordDataFromState = {
    requestStatus: requestStatus.none,
    error: null,
  };

  props = {
    createPasswordData: createPasswordDataFromState,
    children: jest.fn().mockReturnValue(null),
    navigator: jest.fn(),
    createPassword: jest.fn(),
    resetAuth: jest.fn(),
    getCode: jest.fn(),
    search: "?token=asdfasldfkjasdlfkjasdlfkjasdlkfjasdlkfj",
    location: {
      pathname: "",
    },
    history: {
      push: jest.fn(),
      location: {
        search: "",
      },
    },
    showToast: jest.fn(),
  };

  testRenderer = TestRenderer.create(<FormContainer {...props} />);
  instance = testRenderer.getInstance();
});

describe("Create Password - Form Container Component", () => {
  it("should call createPassword when submit", async () => {
    // when
    const values = {
      password: "",
    };

    await instance.submit(values);

    // then
    expect(props.createPassword).toBeCalled();
  });

  it("should call navigate when route to success password is called", () => {
    // when
    instance.routeToPasswordSuccess();

    // then
    expect(instance.props.history.push).toBeCalled();
  });

  it("should call route to success password after receiving a successful create password request", () => {
    // given
    instance.routeToPasswordSuccess = jest.fn();

    // when
    props.createPasswordData.requestStatus = requestStatus.success;
    testRenderer.update(<FormContainer {...props} />);

    // then
    expect(instance.routeToPasswordSuccess).toBeCalled();
  });

  it("should not call route to success password data after receiving a not successful create password request", () => {
    // given
    const error = {};
    instance.routeToPasswordSuccess = jest.fn();

    // when
    props.createPasswordData.requestStatus = requestStatus.error;
    props.createPasswordData.error = error;
    testRenderer.update(<FormContainer {...props} />);

    // then
    expect(instance.routeToPasswordSuccess).not.toBeCalled();
  });

  it("should set errorMessage after receiving an error create password request", () => {
    // given
    const expectedError = {
      message: "Error mock",
    };

    // when
    props.createPasswordData.requestStatus = requestStatus.error;
    props.createPasswordData.error = expectedError;
    testRenderer.update(<FormContainer {...props} />);
    // then
    expect(instance.state.error).toEqual(expectedError.message);
  });

  describe("Redux methods", () => {
    it("should return a object with create password data from passed state", () => {
      // given
      const state = {
        user: { createPassword: createPasswordDataFromState },
      };

      // when
      const result = mapStateToProps(state);

      // then
      expect(result).toEqual({
        createPasswordData: state.user.createPassword,
      });
    });
  });
});
