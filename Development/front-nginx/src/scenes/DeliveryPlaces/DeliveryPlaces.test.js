import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import DeliveryPlaces from "./DeliveryPlaces";

jest.mock("./ProcessingWarning/ProcessingWarning", () => "Warning");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "DefaultButton",
  Container: "Container",
  LinkButton: "LinkButton",
}));
jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
  WithPagination: "WithPagination",
  TableHeader: "TableHeader",
  TableHeaderCol: "TableHeaderCol",
  TableCol: "TableCol",
  TableRow: "TableRow",
}));

const defaultProps = {
  deliveryPlacesData: {
    totalItems: 2,
    content: [
      {
        placeId: "placeId_1",
        address: "addr_1",
        firstContactName: "FCN_1",
        firstContactDoc: "FCD_1",
        secondContactName: "SCN_1",
        secondContactDoc: "SCD_1",
      },
      {
        placeId: "placeId_2",
        address: "addr_2",
        firstContactName: "FCN_2",
        firstContactDoc: "FCD_2",
        secondContactName: "SCN_2",
        secondContactDoc: "SCD_2",
      },
    ],
  },
  callback: jest.fn(),
  onOpenFileDialogClick: jest.fn(),
  onChange: jest.fn(),
  fileInputRef: {},
  emptyStateComponent: <span />,
  requestStatus: "success",
  page: 0,
  thereIsSheetProcessing: false,
  hasGroupAccessLevel: false,
};

describe("Delivery Places - Unit Tests", () => {
  it("Should render with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<DeliveryPlaces {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
