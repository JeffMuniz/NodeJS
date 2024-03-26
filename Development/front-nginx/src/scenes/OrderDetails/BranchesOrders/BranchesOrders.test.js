import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import BranchesOrders from "./BranchesOrders";

jest.mock(
  "../OrderDetailsLine/OrderDetailsLine.container",
  () => "OrderDetailsLine",
);
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Branches Orders - Unit Tests", () => {
  const defaultProps = {
    data: [
      {
        id: "1",
        cnpj: "123.456.789/0000-01",
        totalEmployees: "45",
        amount: "45.567,00",
        color: "#fff",
        status: "CARGA_EFETUADOA",
      },
    ],
    onSearch: jest.fn(),
    handleOrderDetailsByCompanyPress: jest.fn(() => jest.fn()),
    handleClickOnChargeCancel: jest.fn(),
  };
  it("Should render component with default props", () => {
    // given
    const renderer = new ShallowRenderer();
    // when
    renderer.render(<BranchesOrders {...defaultProps} />);
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });
});
