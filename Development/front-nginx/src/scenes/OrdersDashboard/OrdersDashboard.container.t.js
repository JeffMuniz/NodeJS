// @TODO: renomear testes quando remover as verificações de prod
import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";

import { requestStatus, deliveryTypes } from "@enums";

import {
  OrdersDashboardContainer,
  mapStateToProps,
} from "./OrdersDashboard.container";

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
  WithPagination: "WithPagination",
}));
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  LimitChart: "LimitChart",
  RowOrder: "RowOrder",
  VirtualAccount: "VirtualAccount",
}));

const defaultProps = {
  getOrders: jest.fn(),
  resetOrders: jest.fn(),
  cancelOrder: jest.fn(),
  setOrderToCancel: jest.fn(),
  resetCancelState: jest.fn(),
  unsetOrderToCancel: jest.fn(),
  hideWarning: jest.fn(),
  checkForTEDsIssue: jest.fn(),
  dispatch: jest.fn(),
  match: { params: {} },
  selectedGroup: {
    params: {},
  },
  openModal: jest.fn(),
  getDeliveryPlaceNotifications: jest.fn(),
  showWarning: jest.fn(),
  navigator: {
    push: jest.fn(),
  },
};

let instance = null;

describe("Orders Dashboard Container - Unit Tests", () => {
  beforeEach(() => {
    instance = null;
  });

  it("Should render Orders Dashboard Container with default props", async () => {
    // given
    const renderer = new ShallowRenderer();
    // when
    await renderer.render(
      <OrdersDashboardContainer
        {...defaultProps}
        thereIsActiveDP
        deliveryType={deliveryTypes.HR}
      />,
    );
    const result = await renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render Orders Dashboard Container with atleast one order", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      ...defaultProps,
      ordersData: {
        data: {
          id: "faffs0-0df09-fddsf-0905fd",
          date: "Thu Aug 30 2018 13:41:23 GMT-0300",
          mealsAmount: "44.567,00",
          mealsTotalPeople: "390",
          foodAmount: "55.678,00",
          foodTotalPeople: "290",
          status: "pending",
          requirer: "tester",
        },
      },
    };
    // when
    renderer.render(
      <OrdersDashboardContainer
        {...props}
        thereIsActiveDP
        deliveryType={deliveryTypes.HR}
      />,
    );
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });

  it("should return a object with OrdersDashboard from passed state", () => {
    // given
    const state = {
      user: { profile: { data: {} } },
      order: {
        orders: {
          data: {},
          requestStatus: requestStatus.none,
          error: null,
        },
      },
      deliveryPlaces: {
        deliveryPlacesSituation: {},
      },
      selectedCompanyTree: {
        selectedGroup: {},
        selectedCompany: {},
      },
    };
    // when
    const result = mapStateToProps(state);

    // then
    expect(result).toEqual({
      ordersData: {},
      ordersDataRequestStatus: "none",
      userData: {},
      selectedGroup: {},
      selectedCompany: {},
    });
  });

  it("should return new order and new delivery place buttons when group is HR", () => {
    // given
    instance = TestRenderer.create(
      <OrdersDashboardContainer
        {...defaultProps}
        selectedGroup={{
          params: { deliveryType: deliveryTypes.HR },
        }}
      />,
    ).getInstance();
    // when
    const result = instance.handleActionsButtons();
    // then
    expect(result).toHaveLength(2);
  });

  it("should return just new order button when group is door to door", () => {
    // given
    instance = TestRenderer.create(
      <OrdersDashboardContainer
        {...defaultProps}
        selectedGroup={{
          params: { deliveryType: deliveryTypes.door2Door },
        }}
      />,
    ).getInstance();

    // when
    const result = instance.handleActionsButtons();
    // then
    expect(result).toHaveLength(1);
  });

  it("should not disable NewOrder button when there is active DP and handleNewOrderForFirstAccess is called", async () => {
    // given
    const props = {
      ...defaultProps,
      getDeliveryPlaceNotifications: jest
        .fn()
        .mockResolvedValue({ thereIsActiveDP: true }),
    };
    instance = TestRenderer.create(
      <OrdersDashboardContainer
        {...props}
        thereIsActiveDP
        thereIsSheetProcessing={false}
      />,
    ).getInstance();

    instance.showWarning = jest.fn();
    // when
    await instance.handleNewOrderForFirstAccess();
    // then
    expect(instance.state.disableNewOrder).toBeFalsy();
  });

  it("should not call goToPageNewOrder when there isn't active DP even't sheet processing and handleNewOrderForFirstAccess is called", async () => {
    // given
    const props = {
      ...defaultProps,
      getDeliveryPlaceNotifications: jest
        .fn()
        .mockResolvedValue({ thereIsActiveDP: false }),
    };
    instance = TestRenderer.create(
      <OrdersDashboardContainer
        {...props}
        thereIsActiveDP={false}
        thereIsSheetProcessing={false}
      />,
    ).getInstance();
    instance.goToPageNewOrder = jest.fn();
    // when
    await instance.handleNewOrderForFirstAccess();
    // then
    expect(instance.goToPageNewOrder).not.toBeCalled();
  });
});
