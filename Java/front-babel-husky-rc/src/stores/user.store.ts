
import { auth as requestAuth } from "@/api/Login.api";
import { action, observable } from "mobx";
import { persist } from "mobx-persist";

import { BaseStore } from "./base.store";

// Defines the data structure of the data to be observed.
interface IUserStoreData {
  accessToken: string;
  email: string;
  name: string;
  user: string;
}

export class UserStore extends BaseStore<IUserStoreData> {

  // OPTIONAL: Data is overridden here since the 'persist' decorator had to be
  // attached to it's declaration as well.
  @persist("object")
  @observable
  public declare data: IUserStoreData;

  constructor () {
    super({ 
      // Sets the initial values for the data to be observed.
      accessToken: '',
      email: '',
      name: '',
      user: '',
    });
  }

  @action
  async login(email: string, password: string): Promise<void> {
    const result = await requestAuth(email, password);
    this.setData(result);
  }

  // Implements a declarative comparison to avoid performance hiccups and
  // to keep the project in control of it's own updates.
  protected shouldUpdate(newData: IUserStoreData): boolean {
    return (
      newData.accessToken !== undefined &&
      newData.accessToken !== this.data.accessToken
    ) || (
      newData.email !== undefined && newData.email !== this.data.email
    ) || (
      newData.name !== undefined && newData.name !== this.data.name
    ) || (
      newData.user !== undefined && newData.user !== this.data.user
    );
  }

}

export const user = new UserStore();
