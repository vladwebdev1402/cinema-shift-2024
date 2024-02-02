import { IUser } from '@/shared/types/IUser';
import { createSlice } from '@reduxjs/toolkit';
import { authByCode, fetchCode, getUserSession } from './actionCreator';
import { TokenService } from '@/shared/api';

interface UserSliceState {
  isLoading: boolean;
  error: string;
  user: IUser | null;
  isAuth: boolean;
  code: boolean;
  isSuccess: boolean;
}

const initialState: UserSliceState = {
  error: '',
  user: null,
  code: false,
  isAuth: TokenService.checkToken(),
  isLoading: false,
  isSuccess: false,
};

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    clearAfterAuth: (state) => {
      state.isSuccess = false;
      state.code = false;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      TokenService.removeToken();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCode.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchCode.fulfilled, (state) => {
      state.isLoading = false;
      state.code = true;
    });
    builder.addCase(fetchCode.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Ошибка';
    });
    builder.addCase(authByCode.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(authByCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      TokenService.setToken(action.payload!.token);
      state.user = {
        middlename: '',
        ...action.payload!.user,
      };
      state.isSuccess = true;
    });
    builder.addCase(authByCode.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      TokenService.removeToken();
      state.error = 'Ошибка';
    });
    builder.addCase(getUserSession.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getUserSession.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = { ...action.payload!.user };
    });
    builder.addCase(getUserSession.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Ошибка';
    });
  },
});

export const UserReducer = UserSlice.reducer;

export const { clearAfterAuth, logout } = UserSlice.actions;
