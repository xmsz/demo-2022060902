import { createStore, IStoreModels, IStoreDispatch, IStoreRootState } from 'ice';
import menu from './models/menu';

interface IAppStoreModels extends IStoreModels {
  menu: typeof menu;
}

const models: IAppStoreModels = {
  menu,
};

export default createStore(models);

export type IRootDispatch = IStoreDispatch<typeof models>;
export type IRootState = IStoreRootState<typeof models>;
