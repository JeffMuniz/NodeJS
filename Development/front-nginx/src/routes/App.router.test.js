import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import AppRouter from "./App.router";

jest.mock("@scenes", () => ({
  AccessPermission: "AccessPermission",
  PageNotFound: "PageNotFound",
  CreatePassword: "CreatePassword",
  CreatedPassword: "CreatedPassword",
  Login: "Login",
  ForgotPassword: "ForgotPassword",
  OrderDetails: "OrderDetails",
  OrdersDashboard: "OrdersDashboard",
  EmployeeStatement: "EmployeeStatement",
  Employees: "Employees",
  UsersRegistry: "UsersRegistry",
  UsersRegistryEdit: "UsersRegistryEdit",
  Finances: "Finances",
  OrderNew: "OrderNew",
  OrderErrors: "OrderErrors",
  UserDetails: "UserDetails",
  OrderDetailsByCompany: "OrderDetailsByCompany",
  DeliveryPlaces: "DeliveryPlaces",
  DeliveryPlacesNew: "DeliveryPlacesNew",
  DeliveryPlacesSuccess: "DeliveryPlacesSuccess",
  DeliveryPlacesErrors: "DeliveryPlacesErrors",
}));

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Container: "ContainerWrapper",
  Button: "BaseButton",
  Template: "Template",
  WithAuthentication: "PrivateRoute",
}));

describe("AppRouter", () => {
  it("Should render AppRouter", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<AppRouter />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
