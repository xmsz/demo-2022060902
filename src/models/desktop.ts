import { IRootDispatch } from '@/store';
import defaultBackgroundImage from '@/assets/images/surtur-wallpaper.jpg';

interface IState {
  background: {
    imageUrl: string;
  };
}

export default {
  state: {
    background: {
      imageUrl: defaultBackgroundImage,
    },
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
    updateBackgroundImageUrl: (url: string) => {
      dispatch.desktop.update({ background: { imageUrl: url } });
    },
  }),
};
