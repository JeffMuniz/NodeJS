import React from "react";
import TestRenderer from "react-test-renderer";

import { CardTrackingContainer } from "./CardTracking.container";

jest.mock("./CardTracking", () => "CardTracking");

let testRenderer = null;
let instance = null;

beforeEach(() => {
  const defaultProps = {
    resetEmployeesList: jest.fn(),
    getEmployeesList: jest.fn(),
    getTrackingEventList: jest.fn(),
  };
  testRenderer = TestRenderer.create(
    <CardTrackingContainer {...defaultProps} />,
  );
  instance = testRenderer.getInstance();
});

describe("CardTracking container", () => {
  it("should reset employee list when component mounts", () => {
    // then
    expect(instance.props.resetEmployeesList).toBeCalled();
  });

  it("should reset employee list when onSuggestionsFetchRequested is called with search length lower than three and employee list is not empty", () => {
    // given
    const newProps = {
      employeeList: {
        content: [
          {
            cpf: "11122233344",
            name: "AALEX AGUIAR",
          },
        ],
      },
      resetEmployeesList: jest.fn(),
    };
    const search = "12";

    // when
    testRenderer.update(<CardTrackingContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.onSuggestionsFetchRequested({ value: search });

    // then
    expect(instance.props.resetEmployeesList).toBeCalled();
  });

  it("should not reset employee list when onSuggestionsFetchRequested is called with search length lower than three and employee list is already empty", () => {
    // given
    const newProps = {
      employeeList: {},
      resetEmployeesList: jest.fn(),
    };
    const search = "12";

    // when
    testRenderer.update(<CardTrackingContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.onSuggestionsFetchRequested({ value: search });

    // then
    expect(instance.props.resetEmployeesList).not.toBeCalled();
  });

  it("should not get employee list when onSuggestionsFetchRequested is called with search length lower than three", () => {
    // given
    const search = "12";

    // when
    instance.onSuggestionsFetchRequested({ value: search });

    // then
    expect(instance.props.getEmployeesList).not.toBeCalled();
  });

  it("should not get employee list when onSuggestionsFetchRequested is called with search length higher than eleven", () => {
    // given
    const search = "111222333000";

    // when
    instance.onSuggestionsFetchRequested({ value: search });

    // then
    expect(instance.props.getEmployeesList).not.toBeCalled();
  });

  it("should get employee list when onSuggestionsFetchRequested is called", () => {
    // given
    const newProps = {
      selectedCompany: { id: 1234 },
      getEmployeesList: jest.fn(),
    };
    const search = "11122233300";

    // when
    testRenderer.update(<CardTrackingContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.onSuggestionsFetchRequested({ value: search });

    // then
    expect(instance.props.getEmployeesList).toBeCalledWith({
      cpf: search,
      page: 0,
      orderBy: "ASC",
      companyId: newProps.selectedCompany.id,
    });
  });
});
