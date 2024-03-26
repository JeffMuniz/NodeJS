import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import SearchableInput from "./SearchableInput";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  TextInput: "TextInput",
}));

describe("Searchable Input - Unit Tests", () => {
  let instance = null;
  const defaultProps = {
    id: "x",
    fieldsToFilterBy: [
      { key: "value", description: "value" },
      { key: "name", description: "name" },
    ],
    onChange: jest.fn(),
  };

  beforeEach(() => {
    const input = document.createElement("input");
    input.setAttribute("id", "searchable_input_id");
    document.body.appendChild(input);

    instance = TestRenderer.create(<SearchableInput {...defaultProps} />, {
      attachTo: document.getElementById("searchable_input_id"),
    }).getInstance();
  });

  it("Should render component with default props", () => {
    // given
    const renderer = new ShallowRenderer();
    const elementMock = { addEventListener: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockImplementation(() => elementMock);

    // when
    renderer.render(<SearchableInput {...defaultProps} />);
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });

  it("Should close custom select when ESC key gets pressed and that select is open", () => {
    // given
    instance.setState({ showInputOptions: true });
    const event = { keyCode: 27 };
    // when
    instance.handleESCFunction(event);
    // then
    expect(instance.state.showInputOptions).toBeFalsy();
  });

  it("Should close custom select when anywhere instead of custom select gets clicked and that select is open", () => {
    // given
    instance.setState({ showInputOptions: true });
    const event = { target: { dataset: {}, parentNode: { id: 1 } } };
    // when
    instance.handleClickOutSideSelect(event);
    // then
    expect(instance.state.showInputOptions).toBeFalsy();
  });

  it("Should close custom select when handleFilterByChanges gets changed but the value did not change", () => {
    // given
    instance.setState({ showInputOptions: true });
    const filterBy = { key: "value", description: "value" };
    // when
    instance.handleFilterByChanges(filterBy)();
    // then
    expect(instance.state.showInputOptions).toBeFalsy();
  });

  it("Should close custom select when handleFilterByChanges gets changed", () => {
    // given
    instance.setState({ showInputOptions: true });
    const filterBy = { key: "name", description: "name" };
    // when
    instance.handleFilterByChanges(filterBy)();
    // then
    expect(instance.state.showInputOptions).toBeFalsy();
  });

  it("Should call onChange when input changes", () => {
    // given
    const onChange = jest.fn();
    const elementMock = { addEventListener: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockImplementation(() => elementMock);

    const props = {
      ...defaultProps,
      onChange,
    };
    const event = { target: { value: "19" } };
    const localInstance = TestRenderer.create(
      <SearchableInput {...props} />,
    ).getInstance();
    // when
    localInstance.handleInputChange(event);
    localInstance.handleInputChangeCallback();
    // then
    expect(onChange).toBeCalled();
  });
});
