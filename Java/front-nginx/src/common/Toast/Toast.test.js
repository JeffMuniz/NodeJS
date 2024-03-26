import React from "react";
import TestRenderer from "react-test-renderer";

import { ToastContainer } from "./Toast.container";
import { Toast } from "./Toast";

const props = {
  id: 10,
  label: "Teste toast",
  toast: {
    id: 10,
    label: "Teste toast",
  },
  time: 5000,
  remove: jest.fn(),
};

let testRenderer;
let testInstance;
let formInstance;

jest.useFakeTimers();

describe("Toast", () => {
  it("should toast add state queue", () => {
    testRenderer = TestRenderer.create(<ToastContainer {...props} />);
    testInstance = testRenderer.root;
    formInstance = testInstance.findByType(ToastContainer).instance;

    formInstance.remove(1);

    expect(formInstance.state.queue).toEqual([
      {
        id: 10,
        label: "Teste toast",
        path: undefined,
        redirect: undefined,
        redirectText: undefined,
      },
    ]);
  });

  it("should render Toast props empty", () => {
    testRenderer = TestRenderer.create(<ToastContainer />);
    testInstance = testRenderer.root;
    formInstance = testInstance.findByType(ToastContainer).instance;

    expect(formInstance.state.queue).toEqual([]);
  });

  it("should await render toast time", () => {
    testRenderer = TestRenderer.create(<Toast {...props} />);
    testInstance = testRenderer.root;
    formInstance = testInstance.findByType(Toast).instance;

    jest.runAllTimers();

    formInstance.setState({
      active: false,
    });

    expect(formInstance.state).toEqual({
      active: false,
    });
    testRenderer.update();
  });
});
