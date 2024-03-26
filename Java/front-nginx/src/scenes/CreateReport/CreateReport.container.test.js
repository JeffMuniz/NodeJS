import React from "react";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import configureStore from "redux-mock-store";

import CreateReportContainer from "./CreateReport.container";

const mockStore = configureStore([]);

let wrapper;
let instance;
let props;
let store;
jest.mock("./CreateReport", () => "CreateReport");

describe("<CreateReportContainer />", () => {
  beforeEach(() => {
    store = mockStore({
      reports: {
        requestStatus: jest.fn(),
      },
    });
    props = {
      createReport: jest.fn(),
      closeModal: jest.fn(),
    };
    wrapper = create(
      <Provider store={store}>
        <CreateReportContainer {...props} />
      </Provider>,
    );
    instance = wrapper.getInstance();
  });

  it("should call closeModal function", () => {
    instance.closeModal = jest.fn();
    instance.closeModal({});
    expect(instance.closeModal).toBeCalled();
  });

  it("should call createReport function", () => {
    instance.createReport = jest.fn();
    instance.createReport({});
    expect(instance.createReport).toBeCalled();
  });
});
