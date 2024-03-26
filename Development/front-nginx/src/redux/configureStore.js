/*
  Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.

  Para o storage utilizaremos o redux-persist
  Redux Persist takes your Redux state object and saves it to persisted storage. Then on app launch it retrieves this persisted state and saves it back to redux.
*/
import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import { persistReducer, createMigrate } from "redux-persist";
import thunk from "redux-thunk";
import StorageEngine from "redux-persist/lib/storage";

import { connectRouter, routerMiddleware } from "connected-react-router";

import toast from "src/common/Toast/redux/reducer";

import session from "./modules/session/reducer/sessionReducer";
import usersRegistry from "./modules/usersRegistry/reducer/usersRegistryReducer";
import employee from "./modules/employee/reducer/employeeReducer";
import finances from "./modules/finances/reducer/financesReducer";
import stateReconciler from "../storage/StateReconciler";
import user from "./modules/user/reducer/userReducer";
import voucher from "./modules/voucher/reducer/voucher";
import card from "./modules/card/reducer/cardReducer";
import modal from "./modules/modal/reducer/modalReducer";
import group from "./modules/group/reducer/groupReducer";
import subgroup from "./modules/subgroup/reducer/subgroupReducer";
import companies from "./modules/companies/reducer/companiesReducer";
import selectedCompanyTree from "./modules/selectedCompanyTree/reducer/selectedCompanyTreeReducer";
import permissions from "./modules/permissions/reducer/permissionsReducer";
import heroWarning from "./modules/heroWarning/reducer/heroWarningReducer";
import order from "./modules/order/reducer/orderReducer";
import deliveryPlaces from "./modules/deliveryPlaces/reducer/deliveryPlacesReducer";
import reports from "./modules/reports/reducer";
import chargeBack from "./modules/chargeBack/reducer/ChargeBackSelected";
import chargeBackModal from "./modules/chargeBack/reducer/ChargeBackModal";
import virtualAccount from "./modules/chargeBack/reducer/virtualAccount";
import tabs from "./modules/tabs/reducer/tabsReducer";

import { createHistory } from "../modules/History/History";

import { STORAGE_VERSION, migrations } from "./migrations";

const PERSIST_KEY = "rh";
const PERSIST_KEY_FULL_NAME = `persist:${PERSIST_KEY}`;
export const RESET_STATE = "RESET_STATE";

const config = {
  key: PERSIST_KEY,
  version: STORAGE_VERSION,
  storage: StorageEngine,
  whitelist: ["user", "session", "selectedCompanyTree"], // which stores will be persisted
  stateReconciler,
  migrate: createMigrate(migrations),
};

export const history = createHistory();
const middlewares = [thunk, routerMiddleware(history)];

const reducers = combineReducers({
  usersRegistry,
  user,
  employee,
  session,
  voucher,
  toast,
  card,
  finances,
  modal,
  group,
  selectedCompanyTree,
  subgroup,
  permissions,
  companies,
  heroWarning,
  order,
  deliveryPlaces,
  reports,
  chargeBack,
  chargeBackModal,
  virtualAccount,
  tabs,
});

const rootReducer = (state, action) => {
  let localState = state;
  if (action.type === RESET_STATE) {
    StorageEngine.removeItem(PERSIST_KEY_FULL_NAME);
    localState = undefined;
  }
  return reducers(localState, action);
};

let reducer = persistReducer(config, rootReducer);

reducer = connectRouter(history)(reducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

export default createStore(
  reducer,
  composeEnhancer(applyMiddleware(...middlewares)),
);
