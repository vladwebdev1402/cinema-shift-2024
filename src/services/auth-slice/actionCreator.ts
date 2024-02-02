import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from './userAPI';
import { AuthCodeBody } from './types';

export const fetchCode = createAsyncThunk(
  'user/getCode',
  async (phone: string, thunkAPI) => {
    try {
      const response = await userAPI.getCode(phone);
      return response;
    } catch {
      thunkAPI.rejectWithValue('Ошибка');
    }
  },
);

export const authByCode = createAsyncThunk(
  'user/authByCode',
  async (data: AuthCodeBody, thunkAPI) => {
    try {
      const response = await userAPI.authByCode(data);
      return response;
    } catch {
      thunkAPI.rejectWithValue('Ошибка');
    }
  },
);

export const getUserSession = createAsyncThunk(
  'user/session',
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.getSession();
      return response;
    } catch {
      thunkAPI.rejectWithValue('Ошибка');
    }
  },
); 
