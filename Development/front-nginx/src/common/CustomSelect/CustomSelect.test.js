import React from "react";
import TestRenderer from "react-test-renderer";
import CustomSelect from "./CustomSelect";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  TextInput: "TextInput",
  TextInputMask: "TextInputMask",
}));

let props;
let wrapper;
let instance;
let mapOptions;

const allOptions = { value: "all", description: "Todas" };

beforeEach(() => {
  props = {
    options: [
      { value: "test", description: "test" },
      { value: "test2", description: "test 2" },
      { value: "test3", description: "test3" },
    ],
    onSelect: jest.fn(),
    id: "test",
  };
  mapOptions = props.options.map(option => option.value);
  wrapper = TestRenderer.create(<CustomSelect {...props} />);
  instance = wrapper.getInstance();
});

describe("Custom Select Component", () => {
  it("should to be called reloadAvailableOptions when component update with new options", () => {
    // given
    const options = [{ value: "valuetest", description: "value test" }];
    instance.reloadAvailableOptions = jest.fn();
    // then
    wrapper.update(<CustomSelect {...props} options={options} />);

    // when
    expect(instance.reloadAvailableOptions).toBeCalledWith(options);
  });

  it("should not to be called reloadAvailableOptions when component update with new options", () => {
    // given
    instance.reloadAvailableOptions = jest.fn();

    // then
    wrapper.update(<CustomSelect {...props} />);

    // when
    expect(instance.reloadAvailableOptions).not.toBeCalled();
  });

  it("should change availableOptions state when reloadAvailableOptions is called", () => {
    // given
    const options = [{ value: "valuetest", description: "value test" }];

    // then
    instance.reloadAvailableOptions(options);

    // when
    const expected = [allOptions, ...options];
    expect(instance.state.availableOptions).toEqual(expected);
  });

  it("should change selectedItems state when chosenItem selected is equal ALL_OPTIONS_VALUE", () => {
    // given
    // then
    instance.handleOptionClick(allOptions.value)();

    // when
    const expected = [allOptions.value, ...mapOptions];
    expect(instance.state.selectedItems).toEqual(expected);
  });

  it("should change selectedItems state when chosenItem selected is equal a selected item", () => {
    // given
    const selectedItems = [allOptions.value];
    instance.state.selectedItems = selectedItems;

    // then
    instance.handleOptionClick(allOptions.value)();

    // when
    const expected = [];
    expect(instance.state.selectedItems).toEqual(expected);
  });

  it("should change selectedItems state when select a new option", () => {
    // given
    // then
    instance.handleOptionClick(props.options[0].value)();

    // when
    const expected = [props.options[0].value];
    expect(instance.state.selectedItems).toEqual(expected);
  });

  it("should change selectedItems state when chosenItem on selectedItems", () => {
    // given
    instance.state.selectedItems = [
      props.options[0].value,
      props.options[2].value,
    ];
    // then
    instance.handleOptionClick(props.options[0].value)();

    // when
    const expected = [props.options[2].value];
    expect(instance.state.selectedItems).toEqual(expected);
  });

  it("should change selectedItems state when select last option", () => {
    // given
    instance.state.selectedItems = [
      props.options[0].value,
      props.options[1].value,
    ];
    // then
    instance.handleOptionClick(props.options[2].value)();

    // when
    const expected = [...mapOptions, allOptions.value];
    expect(instance.state.selectedItems).toEqual(expected);
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
    const expected = [allOptions, ...props.options];
    expect(instance.state.availableOptions).toEqual(expected);
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
