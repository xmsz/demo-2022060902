import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import desktopReducer from './desktop';

const Store = configureStore({
  reducer: {
    desktop: desktopReducer,
  },
});

type IState = ReturnType<typeof Store.getState>;
type IDispatch = typeof Store.dispatch;

export const useStoreSelector: TypedUseSelectorHook<IState> = useSelector;
export const useStoreDispatch = () => useDispatch<IDispatch>();

export default Store;
