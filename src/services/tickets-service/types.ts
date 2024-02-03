import { IOrder } from '@/shared/types/IOrder';

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
  order: IOrder;
}

export interface GetAllOrdersResponse {
  success: boolean;
  reason: string;
  orders: IOrder[];
}
