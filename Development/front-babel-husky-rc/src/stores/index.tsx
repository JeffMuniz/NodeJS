
import { create } from "mobx-persist";
import React, { FC } from "react";

import { UserStore, user } from "./user.store"

type StoreContext = {
  user: UserStore;
};

const Context = React.createContext<StoreContext>(
  { } as StoreContext
);

export const StoreProvider: FC<{ children: any }> = ({ children }) => (
  <Context.Provider value={ { user } }>
    { children }
  </Context.Provider>
);


const hydrate = create({
  storage: localStorage,
});

// OPTIONAL: Adds the UserStore to the persisting scope.
hydrate(user.constructor.name, user);

export const useStores = () => React.useContext(Context);
