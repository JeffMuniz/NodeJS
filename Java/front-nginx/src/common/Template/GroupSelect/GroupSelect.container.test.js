import React from "react";
import TestRenderer from "react-test-renderer";
import { requestStatus } from "@enums";
import { GroupSelectContainer } from "./GroupSelect.container";

jest.mock("react-router-dom");
jest.mock("./GroupSelect", () => "GroupSelect");
jest.mock("./GroupSelectEmptyState", () => "GroupSelectEmptyState");
jest.mock(
  "src/common/Template/GroupSelect/GroupSelectEmptyState.js",
  () => "GroupSelectEmptyState",
);
jest.mock("src/common/Icon/Icon", () => "Icon");

let testRenderer = null;
let instance = null;
let defaultProps;

beforeEach(() => {
  defaultProps = {
    userId: "1",
    hideWarning: jest.fn(),
    thereIsActiveWarning: false,
    updateSelectedGroup: jest.fn(),
    updateSelectedGroupParams: jest.fn(),
    closeModal: jest.fn(),
    history: { location: { pathName: "" }, push: jest.fn() },
    location: { pathName: "/pedidos" },
  };
  testRenderer = TestRenderer.create(
    <GroupSelectContainer {...defaultProps} />,
  );
  instance = testRenderer.getInstance();
});

describe("GroupSelect container", () => {
  it("should not get group list when updates and group list has content", async () => {
    // given
    const newProps = {
      ...defaultProps,
      groupList: [{ id: 1, name: "Test" }],
      getGroupList: jest.fn(),
    };

    // when
    testRenderer.update(<GroupSelectContainer {...newProps} />);
    instance = testRenderer.getInstance();

    // then
    expect(instance.props.getGroupList).not.toBeCalled();
  });

  it("should not get group list when updates and group list is empty, but request status is success", async () => {
    // given
    const newProps = {
      ...defaultProps,
      groupList: [],
      groupStatus: requestStatus.success,
      getGroupList: jest.fn(),
    };

    // when
    testRenderer.update(<GroupSelectContainer {...newProps} />);
    instance = testRenderer.getInstance();

    // then
    expect(instance.props.getGroupList).not.toBeCalled();
  });

  it("should not get group list when updates and group list is empty, but a group is already selected", async () => {
    // given
    const newProps = {
      ...defaultProps,
      groupList: [],
      selectedGroup: { id: 1, name: "Test" },
      getGroupList: jest.fn(),
    };

    // when
    testRenderer.update(<GroupSelectContainer {...newProps} />);
    instance = testRenderer.getInstance();

    // then
    expect(instance.props.getGroupList).not.toBeCalled();
  });

  it("should update company tree when group is selected", async () => {
    // given
    const selectedGroup = { id: 13, name: "Test Group" };
    // when
    await instance.onSelectGroup(selectedGroup)();
    // then
    expect(instance.props.updateSelectedGroup).toBeCalledWith({
      selectedGroup,
    });
  });
});
