import React from "react";
import TestRenderer from "react-test-renderer";
import SearchableDropdown from "./SearchableDropdown";

jest.mock("./Dropdown/Dropdown", () => "Dropdown");

const defaultProps = {
  onSelect: jest.fn(),
  options: [
    {
      value: "1",
      description: "test_1",
      name: "test_1",
    },
    {
      value: "2",
      description: "test_2",
      name: "test_2",
    },
  ],
  onScrollBottom: jest.fn(),
  searchBy: "name",
};

describe("Searchable Dropdown", () => {
  let instance = null;

  beforeEach(() => {
    instance = TestRenderer.create(
      <SearchableDropdown {...defaultProps} />,
    ).getInstance();
  });

  it("should update AvailableOptions when this func gets called", () => {
    // given
    const expectedResult = {
      chosenOption: null,
      availableOptions: [
        {
          value: "1",
          description: "test_1",
        },
      ],
    };
    // when
    instance.updateAvailableOptions([
      {
        value: "1",
        description: "test_1",
      },
    ]);
    // then
    expect(instance.state).toMatchObject(expectedResult);
  });

  it("should update chosenOption when handleOnSelect gets called", () => {
    // given
    const expectedResult = {
      value: "1",
      description: "test_1",
    };
    // when
    instance.handleOnSelect({
      value: "1",
      description: "test_1",
    })();
    // then
    expect(instance.state.chosenOption).toMatchObject(expectedResult);
  });

  it("should call onSelect when handleOnSelect gets called", () => {
    // when
    instance.handleOnSelect({
      value: "1",
      description: "test_1",
    });
    // then
    expect(instance.props.onSelect).toBeCalled();
  });

  it("should not change available options when no value has passed to handleInputChange", () => {
    // when
    instance.handleInputChange("");
    // then
    expect(instance.state.availableOptions).toMatchObject(defaultProps.options);
  });

  it("should call onFilterOptions when handleInputChange gets called in an instance with onFilterOptions property filled", () => {
    // given
    const props = {
      ...defaultProps,
      onFilterOptions: jest.fn(),
    };

    const privateInstante = TestRenderer.create(
      <SearchableDropdown {...props} />,
    ).getInstance();

    // when

    privateInstante.handleInputChange("test");
    // then
    expect(privateInstante.props.onFilterOptions).toBeCalled();
  });

  it("should change availableOptions input's value matches with at least one option", () => {
    // given
    const exptectedResult = [
      {
        value: "1",
        description: "test_1",
      },
    ];
    // when
    instance.handleInputChange("test_1");
    // then
    expect(instance.state.availableOptions).toMatchObject(exptectedResult);
  });
});
