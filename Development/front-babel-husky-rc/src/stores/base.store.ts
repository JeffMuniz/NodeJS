
import { observable, observe } from "mobx";
import { Observable as WindowedObservable } from "windowed-observable";

import { name as projectName } from '@/../package.json';

// Defines the event format to be broadcasted.
export interface HandleChangeEvent<TData> {
  data: TData;
  projectOfOrigin: string;
  timestamp: number;
};

// 'IData' defines the data to be observed.
export abstract class BaseStore<IData> {

  private windowedObservable: WindowedObservable;

  private initialState: IData;

  @observable
  public data: IData;

  constructor(initialState: IData) {
    this.initialState = { ...initialState };
    this.data = { ...initialState };

    // Creates the object that will be responsible for propagating the
    // observed changes on 'data'.
    this.windowedObservable = new WindowedObservable(this.constructor.name);

    // Registers the publish method to propagate all changes on the
    // observed data.
    observe(this.data, this.publish.bind(this));

    // Registers the change handler.
    this.windowedObservable.subscribe(this.changeHandlerGate.bind(this), {
      latest: true,
    });
  }

  public resetState(): void {
    this.setData(this.initialState);
  }

  public setData(data: IData): void {
    Object.keys(this.data).forEach(key => {
      const value = data[key as keyof IData];
      if(value === undefined) return;
      this.data[key as keyof IData] = value;
    });
  }

  protected abstract shouldUpdate(data: IData): boolean;

  protected handleChange(event: HandleChangeEvent<IData>): void {
    const { data } = event;
    this.setData(data);
  };

  // Checks the change handler should be called by inspecting the state.
  private changeHandlerGate(event: HandleChangeEvent<IData>): void {
    const { data } = event;
    if(!this.shouldUpdate(data)) return;
    this.handleChange(event);
    this.writeDevLog("Changes applied.", this.data);
  }

  // Notifies all relevant parts about changes in the this store.
  private publish(): void {
    this.writeDevLog("Changes published.", this.data);
    this.windowedObservable.publish({
      data: this.data,
      projectOfOrigin: projectName,
      timestamp: Date.now(),
    });
  }

  private writeDevLog(str: string, data?: any): void {
    if(process.env.NODE_ENV !== "development") return;
    console.log(`${projectName}: *** ${str}`);
    if(data) console.log(data);
  }

}
