import { IDesktopItem } from '@/models/desktop';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const desktopSlice = createSlice({
  name: 'desktop',
  initialState: {
    id: '',
    imageUrl: '',
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
