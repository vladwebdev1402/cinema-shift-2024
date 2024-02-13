import { FC, useState } from 'react';
import st from './MobileSeats.module.scss';

import { IChoosePlace, IPlace, ISelectSeat } from '@/shared/types';
import Seat from './Seat';
import { Button } from '@/ui';

interface SeatsProps {
  chooseSeats: IChoosePlace[];
  places: IPlace[][];
  onSeatSelect: (prevSeat: ISelectSeat, seat: IChoosePlace) => void;
  deleteSeat: (seat: ISelectSeat) => void;
  className?: string;
}

const MobileSeats: FC<SeatsProps> = ({
  chooseSeats,
  onSeatSelect,
  places,
  deleteSeat,
  className,
}) => {
  const [isAdd, setIsAdd] = useState(true);

  const showAdd = () => setIsAdd(false);

  return (
    <div className={`${className} ${st.seats}`}>
      <div className={st.seats__head}>
        {chooseSeats.map((seat, idx) => (
          <Seat
            places={places}
            chooseSeats={chooseSeats}
            seatNumber={idx + 1}
            onSeatSelect={onSeatSelect}
            deleteSeat={deleteSeat}
            showAdd={showAdd}
            row={seat.row}
            column={seat.column}
          />
        ))}
        {isAdd && (
          <Seat
            places={places}
            chooseSeats={chooseSeats}
            seatNumber={chooseSeats.length || 1}
            onSeatSelect={onSeatSelect}
            deleteSeat={deleteSeat}
            showAdd={showAdd}
          />
        )}
      </div>
      {!isAdd && (
        <Button
          variant='outlined'
          fullWidth
          className={st.seats__add}
          onClick={() => setIsAdd(true)}
        >
          Ещё место
        </Button>
      )}
    </div>
  );
};

export default MobileSeats;
