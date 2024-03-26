import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Grid from "./Grid";

jest.mock("@base", () => ({
  TableHeader: "TableHeader",
  TableHeaderCol: "TableHeaderCol",
  TableCol: "TableCol",
  TableRow: "TableRow",
}));

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Container: "ContainerWrapper",
  Button: "BaseButton",
}));

const defaultProps = {
  data: [
    {
      placeId: "placeId_1",
      address: "addr_1",
      firstContactName: "FCN_1",
      firstContactDoc: "FCD_1",
      firstContactDocType: "FCDT_1",
      secondContactName: "SCN_1",
      secondContactDoc: "SCD_1",
      secondContactDocType: "SCDT_1",
    },
    {
      placeId: "placeId_2",
      address: "addr_2",
      firstContactName: "FCN_2",
      firstContactDoc: "FCD_2",
      firstContactDocType: "FCDT_2",
      secondContactName: "SCN_2",
      secondContactDoc: "SCD_2",
      secondContactDocType: "SCDT_2",
    },
  ],
};

describe("Delivery Places Grid - Unit Tests", () => {
  it("Should render Grid with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Grid {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
