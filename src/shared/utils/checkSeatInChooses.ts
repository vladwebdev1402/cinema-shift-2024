import { IChoosePlace } from '../types';

export const checkSeatInChooses = (
  chooseSeats: IChoosePlace[],
  row: number,
  column: number,
): boolean =>
  !!chooseSeats.find(
    (arrSeat) => arrSeat.row === row && arrSeat.column === column,
  );
