import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import UserDetails from "./UserDetails";

jest.mock(
  "../AccessPermission/GroupsPermissions/GroupsPermissions",
  () => "GroupsPermissions",
);

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
  WithPagination: "WithPagination",
}));

describe("UserDetails", () => {
  it("Should render UserDetails", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <UserDetails users={[]} handleGoBack={jest.fn} onPageChange={jest.fn} />,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
