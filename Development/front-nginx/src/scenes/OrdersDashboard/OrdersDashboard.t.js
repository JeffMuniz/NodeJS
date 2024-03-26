// @TODO: renomear testes quando remover as verificações de prod
import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import OrdersDashboard from "./OrdersDashboard";

jest.mock("../../routes/navigate");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  OrderCard: "OrderCard",
}));

describe("Orders Dashboard - Unit Tests", () => {
  it("Should render Orders Dashboard with default props", () => {
    // given
    const renderer = new ShallowRenderer();
    // when
    renderer.render(<OrdersDashboard />);
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });
  it("Should render Order Card with atleast on order", () => {
    // given
    const renderer = new ShallowRenderer();
    const orders = [
      {
        id: "faffs0-0df09-fddsf-0905fd",
        date: "Thu Aug 30 2018 13:41:23 GMT-0300",
        mealsAmount: "44.567,00",
        mealsTotalPeople: "390",
        foodAmount: "55.678,00",
        foodTotalPeople: "290",
        status: "pending",
        requirer: "tester",
      },
    ];
    // when
    renderer.render(<OrdersDashboard data={orders} navigator={{}} />);
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });
});
