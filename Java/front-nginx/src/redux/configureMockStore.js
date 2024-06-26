import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];

export const createMockStore = initialState =>
  configureStore(middlewares)(initialState);
