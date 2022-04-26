import services from '@/services';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserInfo } from '../models/user';

export const initUserInfo = createAsyncThunk(
  'user/initUserInfo',
  services.user.info
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {
      id: 0,
      name: '',
      avatar: '',
      account: '',
    },
  },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(
      initUserInfo.fulfilled,
      (draft, action: PayloadAction<IUserInfo>) => {
        draft.info = action.payload;
      }
    ),
});

const userReducer = userSlice.reducer;

export const {} = userSlice.actions;

export default userReducer;
