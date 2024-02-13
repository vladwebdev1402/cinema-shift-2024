import { useState } from 'react';
import { IChoosePlace, ISelectSeat } from '@/shared/types';

export const useChoose = () => {
  const [chooseSeats, setChooseSeats] = useState<IChoosePlace[]>([]);

  const findSeat = (seat: ISelectSeat) => {
    return chooseSeats.find(
      (arrSeat) => arrSeat.row === seat.row && arrSeat.column === seat.column,
    );
  };

  const getDeletedSeats = (seat: ISelectSeat | undefined) => {
    return seat
      ? chooseSeats.filter(
          (arrSeat) =>
            arrSeat.row !== seat.row || arrSeat.column !== seat.column,
        )
      : chooseSeats;
  };

  const deleteSeat = (seat: ISelectSeat) => {
    setChooseSeats(getDeletedSeats(seat));
  };

  const onSeatClick = (seat: IChoosePlace) => {
    const currentSeat = findSeat(seat);
    if (currentSeat) setChooseSeats(getDeletedSeats(currentSeat));
    else setChooseSeats([...chooseSeats, seat]);
  };

  const onSeatSelect = (prevSeat: ISelectSeat, seat: IChoosePlace) => {
    const currentSeat = findSeat(prevSeat);
    const deletedSeats = getDeletedSeats(currentSeat);
    setChooseSeats([...deletedSeats, seat]);
  };

  const clearChooseSeats = () => setChooseSeats([]);

  return { chooseSeats, onSeatClick, onSeatSelect, clearChooseSeats, deleteSeat };
};
