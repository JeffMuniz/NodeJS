
import {
 ChangeEvent, ChangeEventHandler, FC, FocusEventHandler, FormEventHandler, MouseEvent, MouseEventHandler, ReactNode,
} from 'react';
import { Action, Location } from 'history';
import { StorageController } from 'mobx-persist-store';

declare global {
  namespace ExternalModules {
    namespace History {
      export type  {
        Action,
        Location,
      };
    }
    namespace React {
      export type  {
        ChangeEvent,
        ChangeEventHandler,
        FocusEventHandler,
        FormEventHandler,
        MouseEvent,
        MouseEventHandler,
        ReactNode,
        FC,
      };
    }
    namespace MobxStorePersist {
      export type { StorageController };
    }
  }
}
