import { IUser } from '@/shared/types/IUser';

export interface CreateOtpResponse {
  data: {
    success: boolean;
    reason: string;
    retryDelay: number;
  };
}

export interface AuthCodeBody {
  phone: string;
  code: number;
}

export interface AuthCodeResponse {
  data: {
    success: boolean;
    user: {
      _id: string;
      phone: string;
      firstname: string;
      lastname: string;
    };
    token: string;
  };
}

export interface SessionResponse {
  data: {
    success: boolean;
    reason: string;
    user: IUser;
  };
}

export interface updateUserResponse {
  data: {
    success: boolean;
    reason: string;
  };
}
