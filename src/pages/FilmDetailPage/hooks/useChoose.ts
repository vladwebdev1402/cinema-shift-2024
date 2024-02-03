import { useState } from 'react';
import { IChoosePlace } from '@/shared/types';

export const useChoose = () => {
  const [chooseSeats, setChooseSeats] = useState<IChoosePlace[]>([]);

  const onSeatClick = (seat: IChoosePlace) => {
    const currentSeat = chooseSeats.find(
      (arrSeat) => arrSeat.row === seat.row && arrSeat.column === seat.column,
    );

    if (currentSeat)
      setChooseSeats(
        chooseSeats.filter(
          (arrSeat) =>
            arrSeat.row !== seat.row || arrSeat.column !== seat.column,
        ),
      );
    else setChooseSeats([...chooseSeats, seat]);
  };

  const clearChooseSeats = () => setChooseSeats([]);

  return { chooseSeats, onSeatClick, clearChooseSeats };
};
