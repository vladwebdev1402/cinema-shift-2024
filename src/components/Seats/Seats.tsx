import { FC } from 'react';

import st from './Seats.module.scss';
import { IChoosePlace, IPlace } from '@/shared/types';
import RowPlaces from './RowPlaces';

interface SeatsProps {
  chooseSeats: IChoosePlace[];
  places: IPlace[][];
  onSeatClick: (value: IChoosePlace) => void;
  className?: string;
}

const Seats: FC<SeatsProps> = ({
  chooseSeats,
  places,
  onSeatClick,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <div className={st.txt}>Ряд</div>
      <div className={st.seats_body}>
        {places.map((row, idx) => (
          <RowPlaces
            key={idx}
            row={row}
            numberRow={idx + 1}
            onSeatClick={onSeatClick}
            chooseSeats={chooseSeats}
          />
        ))}
      </div>
    </div>
  );
};

export default Seats;
