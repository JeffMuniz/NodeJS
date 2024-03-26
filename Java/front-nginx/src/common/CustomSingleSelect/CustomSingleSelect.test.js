import React from "react";
import TestRenderer from "react-test-renderer";
import CustomSingleSelect from "./CustomSingleSelect";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  TextInput: "TextInput",
  TextInputMask: "TextInputMask",
}));
jest.mock("../CustomSelect/CustomSelect.styles", () => ({
  Container: "Container",
  Option: "Option",
  Description: "Description",
  SearchIcon: "SearchIcon",
  Button: "Button",
  Input: "Input",
  OptionsWrapper: "OptionsWrapper",
}));

let props;
let wrapper;
let instance;

beforeEach(() => {
  props = {
    selectedItem: { description: "1" },
    options: [
      { value: "test", description: "test" },
      { value: "test2", description: "test 2" },
      { value: "test3", description: "test3" },
    ],
    onSelect: jest.fn(),
    id: "test",
    name: "test",
  };
  wrapper = TestRenderer.create(<CustomSingleSelect {...props} />);
  instance = wrapper.getInstance();
});

describe("Custom Single Select Component", () => {
  it("should be called reloadAvailableOptions when component update with new options", () => {
    // given
    const options = [{ value: "valuetest", description: "value test" }];
    instance.reloadAvailableOptions = jest.fn();
    // then
    wrapper.update(<CustomSingleSelect {...props} options={options} />);

    // when
    expect(instance.reloadAvailableOptions).toBeCalledWith(options);
  });

  it("should not be called reloadAvailableOptions when component update with new options", () => {
    // given
    instance.reloadAvailableOptions = jest.fn();

    // then
    wrapper.update(<CustomSingleSelect {...props} />);

    // when
    expect(instance.reloadAvailableOptions).not.toBeCalled();
  });

  it("should change availableOptions state when reloadAvailableOptions is called", () => {
    // given
    const options = [{ value: "valuetest", description: "value test" }];

    // then
    instance.reloadAvailableOptions(options);

    // when
    expect(instance.state.availableOptions).toEqual(options);
  });

  it("should change selectedItems state when chosenItem selected is equal a selected item", () => {
    // given
    const selectedItems = props.options[0].value;
    instance.state.selectedItems = selectedItems;

    // then
    instance.handleOptionClick(props.options[0].value)();

    // when
    expect(instance.state.selectedItem).toEqual(selectedItems);
  });

  it("should change selectedItems state when select a new option", () => {
    // given
    const expected = props.options[1].value;

    // then
    instance.handleOptionClick(props.options[1].value)();

    // when
    expect(instance.state.selectedItem).toEqual(expected);
  });

  it("should change inputValue state when value is empty", () => {
    // given
    const event = {
      target: {
        value: "",
      },
    };
    // then
    instance.filterOptions(event);

    // when
    expect(instance.state.inputValue).toEqual("");
  });

  it("should change availableOptions state when value is empty", () => {
    // given
    const event = {
      target: {
        value: "",
      },
    };
    // then
    instance.filterOptions(event);

    // when
    expect(instance.state.availableOptions).toEqual(props.options);
  });

  it("should change inputValue state when value is defined", () => {
    // given
    const event = {
      target: {
        value: "Test",
      },
    };
    // then
    instance.filterOptions(event);

    // when
    expect(instance.state.inputValue).toEqual("Test");
  });

  it("should change availableOptions state when value is defined", () => {
    // given
    const event = {
      target: {
        value: "Test",
      },
    };
    // then
    instance.filterOptions(event);

    // when
    const expected = [...props.options];
    expect(instance.state.availableOptions).toEqual(expected);
  });

  it("should to be call onSelect when applySelection called", () => {
    // given
    instance.state.selectedItems = [
      props.options[0].value,
      props.options[1].value,
    ];
    // then
    instance.applySelection();
    // when
    expect(props.onSelect).toBeCalled();
  });
});
