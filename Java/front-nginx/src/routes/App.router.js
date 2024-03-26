import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import {
  AccessPermission,
  CreatePassword,
  CreatedPassword,
  DeliveryPlaces,
  DeliveryPlacesEditManually,
  DeliveryPlacesErrors,
  DeliveryPlacesNew,
  DeliveryPlacesNewManually,
  DeliveryPlacesSuccess,
  EmployeeStatement,
  Employees,
  FileConverter,
  Finances,
  ForgotPassword,
  Login,
  OrderConfirmation,
  OrderDetails,
  OrderDetailsByCompany,
  OrderErrors,
  OrderNew,
  OrdersDashboard,
  PageNotFound,
  Reports,
  TermPrivacy,
  UpdateUser,
  UserDetails,
  UsersRegistry,
  UsersRegistryEdit,
} from "@scenes";

import { WithAuthentication as PrivateRoute } from "@common";
import { WithTracker } from "src/modules/Tracking";

import { Routes, WebPaths } from "./consts";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={{}}>
        <Switch>
          <Route exact path={WebPaths[Routes.FIRST_ACCESS]}>
            <WithTracker>
              <CreatePassword />
            </WithTracker>
          </Route>
          <Route exact path={WebPaths[Routes.CREATE_PASSWORD]}>
            <WithTracker>
              <CreatePassword />
            </WithTracker>
          </Route>
          <Route exact path={WebPaths[Routes.CREATED_PASSWORD]}>
            <WithTracker>
              <CreatedPassword />
            </WithTracker>
          </Route>
          <Route exact path={WebPaths[Routes.TERM_PRIVACY]}>
            <WithTracker>
              <TermPrivacy />
            </WithTracker>
          </Route>
          <Route exact path={WebPaths[Routes.UPDATE_USER]}>
            <WithTracker>
              <UpdateUser />
            </WithTracker>
          </Route>
          <Route exact path={WebPaths[Routes.LOGIN]}>
            <WithTracker>
              <Login />
            </WithTracker>
          </Route>
          <Route exact path={WebPaths[Routes.FORGOTPASSWORD]}>
            <WithTracker>
              <ForgotPassword />
            </WithTracker>
          </Route>
          <PrivateRoute
            exact
            path={WebPaths[Routes.ACCESS_PERMISSION]}
            component={AccessPermission}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.USERS_REGISTRY]}
            component={UsersRegistry}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.USERS_REGISTRY_EDIT]}
            component={UsersRegistryEdit}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.EMPLOYEE_STATEMENT]}
            component={EmployeeStatement}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.EMPLOYEES]}
            component={Employees}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.ORDERS_DASHBOARD]}
            component={OrdersDashboard}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.ORDER_CONFIRMATION]}
            component={OrderConfirmation}
          />
          <PrivateRoute
            exact={false}
            path={WebPaths[Routes.FINANCES]}
            component={Finances}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.ORDER_DETAILS]}
            component={OrderDetails}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.NEW_ORDER]}
            component={OrderNew}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.ORDER_ERRORS]}
            component={OrderErrors}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.USER_DETAILS]}
            component={UserDetails}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.ORDER_DETAILS_BY_COMPANY]}
            component={OrderDetailsByCompany}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.DELIVERY_PLACES]}
            component={DeliveryPlaces}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.DELIVERY_PLACES_NEW]}
            component={DeliveryPlacesNew}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.DELIVERY_PLACES_NEW_MANUALLY]}
            component={DeliveryPlacesNewManually}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.DELIVERY_PLACES_EDIT_MANUALLY]}
            component={DeliveryPlacesEditManually}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.DELIVERY_PLACES_SUCCESS]}
            component={DeliveryPlacesSuccess}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.DELIVERY_PLACES_ERRORS]}
            component={DeliveryPlacesErrors}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.REPORTS]}
            component={Reports}
          />
          <PrivateRoute
            exact
            path={WebPaths[Routes.FILE_CONVERTER]}
            component={FileConverter}
          />
          <Route>
            <WithTracker>
              <PageNotFound />
            </WithTracker>
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}
