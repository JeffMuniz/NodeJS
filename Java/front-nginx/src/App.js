import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { hot } from "react-hot-loader";

import { ConnectedRouter } from "connected-react-router";
import "react-dates/initialize";

import ToastContainer from "src/common/Toast/Toast.container";
import { initializeGA } from "src/modules/Tracking";
import AppRouter from "./routes/App.router";
import store, { history } from "./redux/configureStore";

const persistor = persistStore(store);
initializeGA();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <AppRouter />
      </PersistGate>
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
