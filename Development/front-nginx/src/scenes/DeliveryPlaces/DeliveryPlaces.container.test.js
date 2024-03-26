import React from "react";
import TestRenderer from "react-test-renderer";
import { DeliveryPlacesContainer } from "./DeliveryPlaces.container";

jest.mock("./DeliveryPlaces", () => "DeliveryPlaces");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  AlertMessage: "AlertMessage",
}));
jest.mock("react-router-dom", () => "Route");

const defaultProps = {
  getDeliveryPlaces: jest.fn(),
  getOrderNotifications: jest.fn(),
  getDeliveryPlaceNotifications: jest.fn(),
  getUserAccessLevel: jest.fn().mockReturnValue(false),
  openModal: jest.fn(),
  closeModal: jest.fn(),
  selectedGroup: {},
  requestStatus: "none",
  loggedUserCpf: "",
  hasGroupAccessLevel: false,
  loggedUserId: "123",
  groupId: 456,
  deliveryType: "",
  selectedCompany: {},
  deliveryPlacesSituation: {
    thereIsActiveDP: false,
  },
  thereIsSheetProcessing: false,
};

describe("Delivery Places Container - Unit Tests", () => {
  let instance = null;

  beforeEach(() => {
    instance = TestRenderer.create(
      <DeliveryPlacesContainer {...defaultProps} />,
    ).getInstance();
    instance.fetchData = jest.fn();
    instance.openFileDialog = jest.fn();
  });

  it("Should call fetchData when componentDidMount", async () => {
    // when
    await instance.componentDidMount();

    // expect
    expect(instance.fetchData).toHaveBeenCalled();
  });

  it("Should invoke openModal fn if there is an order file being processed", async () => {
    // given
    instance.setState({
      isOrderFileBeingProcessed: true,
      thereIsSheetProcessing: false,
    });

    // when
    await instance.openFileDialogHandler();

    // then
    expect(instance.props.openModal).toHaveBeenCalled();
    expect(instance.openFileDialog).not.toHaveBeenCalled();
  });

  it("Should invoke openModal fn if there is an delivery place file being processed", async () => {
    // given
    instance.setState({
      isOrderFileBeingProcessed: false,
      thereIsSheetProcessing: true,
    });

    // when
    await instance.openFileDialogHandler();

    // then
    expect(instance.props.openModal).toHaveBeenCalled();
    expect(instance.openFileDialog).not.toHaveBeenCalled();
  });

  it("Should invoke openModal fn if there isnt a delivery place file being processed", async () => {
    // given
    instance.setState({
      isOrderFileBeingProcessed: false,
      thereIsSheetProcessing: false,
    });

    // when
    await instance.openFileDialogHandler();

    // then
    expect(instance.openFileDialog).toHaveBeenCalled();
  });
});
