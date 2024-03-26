import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Layout from '@/components/layout/Layout.component';
import Microfrontend from '@/components/microfrontend/Microfrontend.component';
import LoginView from './login/Login.view';

const Routes: FC = () => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginView} />
      <Route
        path="/"
        render={() =>
          localStorage.getItem('token') ? (
            <Layout>
              <Microfrontend id="app-aprovacao" />
              <Microfrontend id="app-financeiro" />
              <Microfrontend id="app-pagamento" />
              <Microfrontend id="app-pedido" />
              <Microfrontend id="app-transacao" />
              <Microfrontend id="app-ec" />
              <Microfrontend id="app-conciliacao" />
              <Microfrontend id="app-extrato" />
            </Layout>
          ) : (
            <Redirect to="/login" />
          )
        }></Route>
    </Switch>
  </Router>
);

export default Routes;
