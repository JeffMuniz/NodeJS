import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { SubgroupsPermissions } from "./SubgroupsPermissions";

jest.mock("@base", () => ({
  TableCol: "TableCol",
  TableRow: "TableRow",
}));
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Subgroups Permissions", () => {
  it("Should render it", () => {
    // given
    const props = {
      subgroups: [
        {
          id: "id1",
        },
      ],
      history: {},
    };
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<SubgroupsPermissions {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
