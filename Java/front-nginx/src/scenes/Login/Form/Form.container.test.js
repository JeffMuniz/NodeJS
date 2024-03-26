import React from "react";
import TestRenderer from "react-test-renderer";
import { requestStatus } from "@enums";
import { Routes, WebPaths } from "src/routes/consts";

import { FormContainer, mapStateToProps } from "./Form.container";

jest.mock("../../../routes/navigate");
jest.mock("src/modules/Form/Form", () => "FormWrapper");
jest.mock("./Form", () => "Form");
jest.mock("./Form.schema", () => "FormSchema");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "Button",
}));

let testRenderer = null;
let instance = null;
let props = null;
let sessionMock = {};

beforeEach(() => {
  sessionMock = {
    requestStatus: requestStatus.none,
    error: null,
  };

  props = {
    session: sessionMock,
    children: jest.fn().mockReturnValue(null),
    navigator: jest.fn(),
    changeInputStatus: jest.fn(),
    signIn: jest.fn(),
    resetAuth: jest.fn(),
    toggleLoading: jest.fn(),
    routeToOrdersDashboard: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };

  testRenderer = TestRenderer.create(<FormContainer {...props} />);
  instance = testRenderer.getInstance();
});

describe("Login - Form Container Component", () => {
  it("should call route to home after receiving a successful login request", async () => {
    // when
    const status = "ATIVO";
    const acceptedTerm = true;
    let ordersFunctionMock;

    if (status === "ATIVO") {
      if (acceptedTerm) {
        // then
        await instance.submit();

        ordersFunctionMock = { push: ["/pedidos"] };
      }
    }

    expect(ordersFunctionMock.push).toEqual([
      WebPaths[Routes.ORDERS_DASHBOARD],
    ]);
  });

  it("should not call route to home after receiving a not successful login request", () => {
    // given
    instance.routeToOrdersDashboard = jest.fn();
    const error = {
      message: "Error mock",
    };

    // when
    props.session.requestStatus = requestStatus.error;
    props.session.error = error;
    testRenderer.update(<FormContainer {...props} />);

    // then
    expect(instance.routeToOrdersDashboard).not.toBeCalled();
  });

  it("should set errorMessage after receiving an error login request", () => {
    // given
    const expectedError = {
      message: "Error mock",
    };
    instance.routeToOrdersDashboard = jest.fn();

    // when
    props.session.requestStatus = requestStatus.error;
    props.session.error = expectedError;

    testRenderer.update(<FormContainer {...props} />);
    // then
    expect(instance.state.error).toEqual(expectedError.message);
  });

  it("should change state of passwordStatus when call changeInputStatus", () => {
    // given
    // when
    instance.changeInputStatus("passwordStatus");

    // then
    expect(instance.state.passwordStatus).toBeFalsy();
  });

  it("should change state of cpfStatus when call changeInputStatus", () => {
    // given
    // when
    instance.changeInputStatus("cpfStatus");

    // then
    expect(instance.state.cpfStatus).toBeFalsy();
  });

  describe("Redux methods", () => {
    it("should return a object with session from passed state", () => {
      // given
      const state = {
        session: { login: sessionMock },
        anotherStuff: {},
      };

      // when
      const result = mapStateToProps(state);

      // then
      expect(result).toEqual({ session: state.session });
    });
  });
});
