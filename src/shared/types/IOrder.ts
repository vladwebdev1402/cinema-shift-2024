export interface IOrder {
  _id: string;
  filmName: string;
  orderNumber: number;
  tickets: {
    filmId: string;
    row: number;
    column: number;
    seance: {
      date: string;
      time: string;
    };
    phone: string;
  }[];
  phone: string;
  status: TOrderStatus;
}

export type TOrderStatus = 'PAYED' | 'CANCELED';
export enum EnumOrderStatus {
  'PAYED' = 'Оплачен',
  'CANCELED' = 'Возвращён',
}
