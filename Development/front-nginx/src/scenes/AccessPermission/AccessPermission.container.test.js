import React from "react";
import TestRenderer from "react-test-renderer";

import { AccessPermissionContainer } from "./AccessPermission.container";

jest.mock("./AccessPermission", () => "AccessPermission");

let instance;
let testRenderer;
let props;

describe("Access Permission Container", () => {
  beforeEach(() => {
    props = {
      users: [{}],
      subgroups: [{}],
      totalUsersPermissions: 1,
      idGroup: 123,
      idMatrix: 345,
      setSelectedSubgroup: jest.fn(),
      setAccessPermissionActiveTab: jest.fn(),
      accessPermissionActiveTab: "test tab",
      subgroupTotalItems: 234,
      subgroupStatus: "test status",
      getSubgroups: jest.fn(),
      getAuthorizedUsers: jest.fn(),
      groupStatus: "test group status",
      selectedGroupName: "test group name",
    };

    testRenderer = TestRenderer.create(
      <AccessPermissionContainer {...props} />,
    );
    instance = testRenderer.getInstance();

    jest.clearAllMocks();
  });

  it("should call getAuthorizedUsersBySelectedTab when component did mount is called", () => {
    // given
    instance.getAuthorizedUsersBySelectedTab = jest.fn();

    // when
    instance.componentDidMount();

    // then
    expect(instance.getAuthorizedUsersBySelectedTab).toBeCalled();
  });

  it("should call setAccessPermissionActiveTab and getAuthorizedUsersBySelectedTab when onTabChangeCallback is called", async () => {
    // given
    instance.getAuthorizedUsersBySelectedTab = jest.fn();

    // when
    await instance.onTabChangeCallback("test label")();

    // then
    expect(instance.props.setAccessPermissionActiveTab).toBeCalledWith(
      "test label",
    );
    expect(instance.getAuthorizedUsersBySelectedTab).toBeCalled();
  });

  it("should call setState, setAccessPermissionActiveTab and getAuthorizedUsersBySelectedTab", () => {
    // given
    instance.getAuthorizedUsersBySelectedTab = jest.fn();
    instance.setState = jest.fn();
    instance.onTabChangeCallback = jest.fn();

    // when
    instance.onTabChange({ label: "test label" });

    // then
    expect(instance.setState).toBeCalledWith(
      {
        selectedTab: "test label",
      },
      instance.onTabChangeCallback("test label"),
    );
  });

  it("should call instance.props.setSelectedSubgroup when instance.setSelectedSubgroup is called", () => {
    // when
    instance.setSelectedSubgroup("1234");

    // then
    expect(instance.props.setSelectedSubgroup).toBeCalledWith({
      idMatrix: "1234",
    });
  });

  it("should call setState and getSubgroups when getAuthorizedUsersBySelectedTab is called and isGroupCompany is false", () => {
    // given
    instance.isGroupCompany = jest.fn(() => false);
    instance.setState = jest.fn();
    instance.state = {
      tabs: {
        firstTestTab: "firstTestTab",
        secondTestTab: "secondTestTab",
      },
      selectedTab: "firstTestTab",
    };

    // when
    instance.getAuthorizedUsersBySelectedTab({
      page: 1,
      size: 20,
      orderBy: "desc",
    });

    // then
    expect(instance.setState).toBeCalledWith({
      idCompanyGroup: undefined,
      idCompanySubGroup: "firstTestTab",
    });
    expect(instance.props.getSubgroups).toBeCalledWith({
      idGroup: 123,
      page: 1,
      size: 20,
    });
  });

  it("should call setState, getAuthorizedUsers and getSubgroups when getAuthorizedUsersBySelectedTab is called and isGroupCompany is true", () => {
    // given
    instance.isGroupCompany = jest.fn(() => true);
    instance.setState = jest.fn();
    instance.state = {
      tabs: {
        firstTestTab: "firstTestTab",
        secondTestTab: "secondTestTab",
      },
      selectedTab: "firstTestTab",
    };

    // when
    instance.getAuthorizedUsersBySelectedTab({
      page: 1,
      size: 20,
      orderBy: "desc",
    });

    // then
    expect(instance.setState).toBeCalledWith({
      idCompanyGroup: "firstTestTab",
      idCompanySubGroup: undefined,
    });
    expect(instance.props.getAuthorizedUsers).toBeCalledWith({
      page: 1,
      size: 20,
      orderBy: "desc",
      idCompanyGroup: "firstTestTab",
    });
  });

  it("should return true when isGroupCompany is called and state.selectedTab equals to Grupo", () => {
    // given
    instance.state = {
      ...instance.state,
      selectedTab: "Grupo",
    };

    // when
    const result = instance.isGroupCompany();

    // then
    expect(result).toBeTruthy();
  });

  it("should return false when isGroupCompany is called and state.selectedTab is not Grupo", () => {
    // given
    instance.state = {
      ...instance.state,
      selectedTab: "test tab",
    };

    // when
    const result = instance.isGroupCompany();

    // then
    expect(result).toBeFalsy();
  });
});
