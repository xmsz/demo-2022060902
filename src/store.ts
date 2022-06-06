import { createStore, IStoreModels, IStoreDispatch, IStoreRootState } from 'ice';
import desktop from './models/desktop';
import menu from './models/menu';

interface IAppStoreModels extends IStoreModels {
  menu: typeof menu;
  desktop: typeof desktop;
}

const models: IAppStoreModels = {
  menu,
  desktop,
};

export default createStore(models);

export type IRootDispatch = IStoreDispatch<typeof models>;
export type IRootState = IStoreRootState<typeof models>;
