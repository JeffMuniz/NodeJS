import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";

import Select from "./Select.js";

jest.mock("../../modules/MultiSelect/MultiSelect", () => "");

const defaultProps = {
  id: "id",
  values: [
    { id: 1, name: "test" },
    { id: 2, name: "test2" },
  ],
};
let testRenderer = null;
let instance = null;
let multiInstance = null;

beforeEach(() => {
  testRenderer = TestRenderer.create(<Select {...defaultProps} />);
  instance = testRenderer.getInstance();
  multiInstance = TestRenderer.create(
    <Select {...defaultProps} multiSelect />,
  ).getInstance();
});

describe("Select Component", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Select {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render it when error is given", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Select {...defaultProps} error="Erro" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should set selectedItem when onSelectedItemsChange is called", () => {
    // given
    const item = { id: 2, name: "test2" };

    // when
    instance.onSelectedItemsChange(item);

    // then
    expect(instance.state.selectedItem).toEqual(item);
  });

  it("should call onValueChange callback when onSelectedItemsChange is called", () => {
    // given
    const item = { id: 2, name: "test2" };
    const onValueChange = jest.fn();
    testRenderer.update(
      <Select {...defaultProps} onValueChange={onValueChange} />,
    );

    // when
    instance.onSelectedItemsChange(item);

    // then
    expect(onValueChange).toBeCalled();
  });

  it("Should return null when call onMenuScrollToBottom of default props", () => {
    // given
    // when
    const result = instance.props.onMenuScrollToBottom();

    // then
    expect(result).tomacull();
  });

  it("Should return null when call onBlur of default props", () => {
    // given
    // when
    const result = instance.props.onBlur();

    // then
    expect(result).tomacull();
  });

  it("Should handle multiSlelect changes functions", () => {
    // given
    multiInstance.setState({ selectedItem: [] });
    // when
    multiInstance.onSelectedItemsChange([{ id: 0, name: "Todos" }]);

    // then
    expect(multiInstance.state.selectedItem).toMatchObject([
      { id: 1, name: "test" },
      { id: 2, name: "test2" },
    ]);
  });

  it("Should add all items on multiselect when all items got clicked", () => {
    // given
    multiInstance.setState({ selectedItem: [] });
    // when
    multiInstance.handleMultiSelectChange([{ id: 0, name: "Todos" }]);

    // then
    expect(multiInstance.state.selectedItem).toMatchObject([
      { id: 1, name: "test" },
      { id: 2, name: "test2" },
    ]);
  });

  it("Should add all items on multiselect when all items got selected one by one", () => {
    // given
    multiInstance.setState({
      selectedItem: [{ id: 2, name: "test2" }],
    });
    // when
    multiInstance.handleMultiSelectChange([{ id: 1, name: "test" }]);
    // then
    expect(multiInstance.state.selectedItem).toMatchObject([
      { id: 1, name: "test" },
      { id: 2, name: "test2" },
    ]);
  });

  it("Should add item on multiselect when one item got selected", () => {
    // given
    const props = {
      ...defaultProps,
      values: [...defaultProps.values, { id: 3, name: "teste 3" }],
    };

    const privateInstance = TestRenderer.create(
      <Select {...props} multiSelect />,
    ).getInstance();

    privateInstance.setState({
      selectedItem: [],
    });

    // when
    privateInstance.handleMultiSelectChange([{ id: 1, name: "test" }]);

    // then
    expect(privateInstance.state.selectedItem).toMatchObject([
      { id: 1, name: "test" },
    ]);
  });

  it("Should remove all items on multiselect when allOptions item got removed", () => {
    // given
    multiInstance.setState({
      selectedItem: [
        { id: 0, name: "test" },
        { id: 1, name: "test1" },
      ],
    });

    // when
    multiInstance.handleMultiSelectChange([{ id: 1, name: "test" }]);

    // then
    expect(multiInstance.state.selectedItem).toMatchObject([]);
  });

  it("Should remove allOptions item on multiselect when an item got removed and there was allOptions added", () => {
    // given
    multiInstance.setState({
      selectedItem: [
        { id: 0, name: "test" },
        { id: 1, name: "test1" },
        { id: 2, name: "test2" },
      ],
    });

    // when
    multiInstance.handleMultiSelectChange([
      { id: 0, name: "test" },
      { id: 1, name: "test" },
    ]);

    // then
    expect(multiInstance.state.selectedItem).toMatchObject([
      { id: 1, name: "test" },
    ]);
  });

  it("Should remove single item on multiselect when an item got removed", () => {
    // given
    multiInstance.setState({
      selectedItem: [
        { id: 1, name: "test1" },
        { id: 2, name: "test2" },
      ],
    });

    // when
    multiInstance.handleMultiSelectChange([{ id: 1, name: "test" }]);

    // then
    expect(multiInstance.state.selectedItem).toMatchObject([
      { id: 1, name: "test" },
    ]);
  });
});
