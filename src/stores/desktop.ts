import { IDesktopItem } from '@/models/desktop';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultImageUrl =
  'https://7761-walles-6gtx8pc7c217c2e1-1253987267.tcb.qcloud.la/WaningGibbous_ZH-CN9648865417_1920x1080_2022-04-12.jpg';

export const desktopSlice = createSlice({
  name: 'desktop',
  initialState: {
    id: '',
    imageUrl: defaultImageUrl,
  },
  reducers: {
    switchDesktop: (draft, action: PayloadAction<IDesktopItem>) => {
      draft.id = action.payload.id;
      draft.imageUrl = action.payload.backgroundUrl;
    },
  },
});

const desktopReducer = desktopSlice.reducer;

export const { switchDesktop } = desktopSlice.actions;

export default desktopReducer;
