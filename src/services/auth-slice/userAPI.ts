import { API_URL } from '@/shared/constants';
import axios from 'axios';
import { AuthCodeBody, AuthCodeResponse, CreateOtpResponse, SessionResponse } from './types';
import { TokenService } from '@/shared/api';

export class userAPI {
  static getCode = async (phone: string) => {
    const response = await axios.post<{ phone: string }, CreateOtpResponse>(
      API_URL + '/auth/otp',
      {
        phone,
      },
    );
    return response.data;
  };

  static authByCode = async (data: AuthCodeBody) => {
    const response = await axios.post<AuthCodeBody, AuthCodeResponse>(
      API_URL + '/users/signin',
      {
        ...data,
      },
    );
    return response.data;
  };

  static getSession = async () => {
    const response = await axios.get<void, SessionResponse>(
      API_URL + '/users/session',
      {headers: {
        Authorization: `Bearer ${TokenService.getToken()}`
      }}
    );
    return response.data;
  };
}
