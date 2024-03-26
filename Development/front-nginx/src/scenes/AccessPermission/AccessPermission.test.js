import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { AccessPermission } from "./AccessPermission";

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
  WithPagination: "WithPagination",
  OrderComponent: "OrderComponent",
}));

jest.mock("@common", () => ({
  Tabs: "Tabs",
}));

jest.mock("./GroupsPermissions/GroupsPermissions", () => "GroupsPermissions");
jest.mock(
  "./SubgroupsPermissions/SubgroupsPermissions",
  () => "SubgroupsPermissions",
);

describe("Access Permission", () => {
  it("Should render it", () => {
    // given
    const props = {
      users: [{}],
      subgroups: [{}],
      history: {},
      onPageChange: jest.fn(),
      totalUsers: 1,
      onTabChange: jest.fn(),
      setSelectedMatrix: jest.fn(),
      accessPermissionActiveTab: "test active tab",
      subgroupTotalItems: 1,
      subgroupStatus: "test subgroup status",
      groupStatus: "test group status",
      selectedGroupName: "test name",
      setSelectedSubgroup: jest.fn(),
    };
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<AccessPermission {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
