import { IUser } from '@/shared/types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  authByCode,
  fetchCode,
  getUserSession,
  updateUser,
} from './actionCreator';
import { TokenService } from '@/shared/api';

interface UserSliceState {
  isLoading: boolean;
  error: string;
  user: IUser | null;
  isAuth: boolean;
  code: number;
}

const initialState: UserSliceState = {
  error: '',
  user: null,
  code: 0,
  isAuth: TokenService.checkToken(),
  isLoading: false,
};

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    clearAfterAuth: (state) => {
      state.code = 0;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      TokenService.removeToken();
    },
    editUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCode.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.code = action.payload!.retryDelay;
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
    });
    builder.addCase(authByCode.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      TokenService.removeToken();
      state.error = 'Неправильно введён код';
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
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Ошибка';
    });
  },
});

export const UserReducer = UserSlice.reducer;

export const { clearAfterAuth, logout, editUser } = UserSlice.actions;
