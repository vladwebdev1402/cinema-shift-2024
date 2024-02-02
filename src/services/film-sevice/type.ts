import { IFilm, ISchedule } from '@/shared/types';
import { IOrder } from '@/shared/types/IOrder';

export interface ITodayFilmResponse {
  success: boolean;
  reason: string;
  films: IFilm[];
}

export interface IFilmByIdResponse {
  success: boolean;
  reason: string;
  film: IFilm;
}

export interface IFilmScheduleResponse {
  success: boolean;
  schedules: ISchedule[];
}

export interface PayTicket {
  filmId: string;
  person: {
    firstname: string;
    lastname: string;
    middlename: string;
    phone: string;
  };
  debitCard: {
    pan: string;
    expireDate: string;
    cvv: string;
  };
  seance: {
    date: string;
    time: string;
  };
  tickets: {
    row: number;
    column: number;
  }[];
}


export interface PayTicketResponse {
  success: boolean;
  order: IOrder
}
