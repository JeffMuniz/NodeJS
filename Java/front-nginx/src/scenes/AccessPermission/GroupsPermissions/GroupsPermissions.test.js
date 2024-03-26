import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { Groups } from "./GroupsPermissions";

jest.mock("@base", () => ({
  TableHeader: "TableHeader",
  TableHeaderCol: "TableHeaderCol",
  TableRow: "TableRow",
  TableCol: "TableCol",
  EditButton: "EditButton",
  DeleteButton: "DeleteButton",
}));

describe("Groups", () => {
  it("Should render it", () => {
    // given
    const props = {
      users: [
        {
          id: "id1",
        },
      ],
    };
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Groups {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
