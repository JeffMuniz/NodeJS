
import {
 Action, Location, createBrowserHistory,
} from 'history';
import {
 Redirect, Route, Router, Switch,
} from 'react-router-dom';

import { ROUTES } from '~/consts';
import {
  AcquirersPage,
 BankAccountPage, CPFConfirmationPage, ConfirmationCodePage, CongratsPage, ContactInfoPage, DataConfirmationPage, EstablishmentDataPage, FeesAndTariffsPage, HomePage, IdentityConfirmationPage, NameConfirmationPage, PATQuestionsPage,
} from '~/pages';
import ContactPreferencePage from '~/pages/contact-preference/contact-preference.page';
import { Header } from '~/partials';
import { AppDataStore } from '~/stores';
import { GlobalStyles, ThemeProvider } from '~/theme';
import { PageWrapper, Wrapper } from './App.styled';

const handleNavigation = (location: Location, action: Action) => {
  AppDataStore.handleNavigationUpdate({
    action,
    location,
  });
};

const history = createBrowserHistory();
history.listen(handleNavigation);
handleNavigation(history.location, history.action);

const App = () => (
  <Wrapper className="App">
    <GlobalStyles />
    <ThemeProvider>
      <Router history={history}>
        <PageWrapper>
          <Switch>
            <Route
              exact
              path={ROUTES.HOME}
              component={HomePage}
            />
            <Route
              path={ROUTES.NAME_CONFIRMATION}
              component={NameConfirmationPage}
            />
            <Route
              path={ROUTES.CPF_CONFIRMATION}
              component={CPFConfirmationPage}
            />
            <Route
              path={ROUTES.CONTACT_INFO}
              component={ContactInfoPage}
            />
            <Route
              path={ROUTES.CONTACT_PREFERENCE}
              component={ContactPreferencePage}
            />
            <Route
              path={ROUTES.CONFIRMATION_CODE}
              component={ConfirmationCodePage}
            />
            <Route
              path={ROUTES.IDENTITY_CONFIRMATION}
              component={IdentityConfirmationPage}
            />
            <Route
              path={ROUTES.ESTABLISHMENT_DATA}
              component={EstablishmentDataPage}
            />
            <Route
              path={`${ROUTES.PAT_QUESTIONS}/:type/:question`}
              component={PATQuestionsPage}
            />
            <Route
              path={[
                ROUTES.ACQUIRERS,
                `${ROUTES.ACQUIRERS}/:acquirer`,
              ]}
              component={AcquirersPage}
            />
            <Route
              path={ROUTES.FEES_AND_TARIFFS}
              component={FeesAndTariffsPage}
            />
            <Route
              path={ROUTES.BANK_ACCOUNT}
              component={BankAccountPage}
            />
            <Route
              path={ROUTES.CONGRATS}
              component={CongratsPage}
            />
            <Route
              path={ROUTES.DATA_CONFIRMATION}
              component={DataConfirmationPage}
            />

            {/* Redirections START */}
            <Redirect
              from={ROUTES.PAT_QUESTIONS}
              to={`${ROUTES.PAT_QUESTIONS}/vr/01`}
            />
            <Redirect to={ROUTES.HOME} />
            {/* Redirections END */}
          </Switch>
        </PageWrapper>
        <Header />
      </Router>
    </ThemeProvider>
  </Wrapper>
);

export default App;

// const routes: App.RouteList = [ {
//   component: HomePage,
//   exact: true,
//   path: ROUTES.HOME,
// }, {
//   path: ROUTES.NAME_CONFIRMATION,
//   component: NameConfirmationPage,
// }, {
//   path: ROUTES.CPF_CONFIRMATION,
//   component: CPFConfirmationPage,
// }, {
//   path: ROUTES.CONTACT_INFO,
//   component: ContactInfoPage,
// }, {
//   path: ROUTES.CONTACT_PREFERENCE,
//   component: ContactPreferencePage,
// }, {
//   path: ROUTES.CONFIRMATION_CODE,
//   component: ConfirmationCodePage,
// }, {
//   path: ROUTES.IDENTITY_CONFIRMATION,
//   component: IdentityConfirmationPage,
// }, {
//   path: ROUTES.ESTABLISHMENT_DATA,
//   component: EstablishmentDataPage,
// }, {
//   path: `${ROUTES.PAT_QUESTIONS}/:type/:question`,
//   component: PATQuestionsPage,
// }, {
//   path: ROUTES.ACQUIRERS,
//   component: AcquirersPage,
// }, {
//   path: ROUTES.FEES_AND_TARIFFS,
//   component: FeesAndTariffsPage,
// }, {
//   path: ROUTES.BANK_ACCOUNT,
//   component: BankAccountPage,
// }, {
//   path: ROUTES.CONGRATS,
//   component: CongratsPage,
// }, {
//   path: ROUTES.DATA_CONFIRMATION,
//   component: DataConfirmationPage,
// } ];
