import { IChoosePlace } from '@/shared/types';

export const checkActive = (
  chooseSeats: IChoosePlace[],
  row: number,
  column: number,
): boolean =>
  !!chooseSeats.find(
    (arrSeat) => arrSeat.row === row && arrSeat.column === column,
  );
