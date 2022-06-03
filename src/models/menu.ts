import { IRootDispatch } from '@/store';

interface IState {
  isOpen: boolean;
}

export default {
  state: {
    isOpen: false,
  },
  reducers: {
    update(prevState: IState, payload: IState) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  effects: (dispatch: IRootDispatch) => ({
    openMenu: () => {
      dispatch.menu.update({ isOpen: true });
    },
    closeMenu: () => {
      dispatch.menu.update({ isOpen: false });
    },
  }),
};
