import { FC } from 'react';

import st from './Seats.module.scss';
import { IChoosePlace, IPlace } from '@/shared/types';
import { Seat } from '@/ui';
import { checkActive } from './utils/checkActive';

interface RowPlacesProps {
  chooseSeats: IChoosePlace[];
  numberRow: number;
  row: IPlace[];
  onSeatClick: (value: IChoosePlace) => void;
}

const RowPlaces: FC<RowPlacesProps> = ({
  chooseSeats,
  numberRow,
  row,
  onSeatClick,
}) => {
  return (
    <div className={st.row}>
      <div className={st.row_number}>{numberRow}</div>
      <>
        {row.map((place, idx) => (
          <div key={idx} className={st.seat}>
            <Seat
              type={place.type}
              className={st.seat_btn}
              column={idx + 1}
              row={numberRow}
              price={place.price}
              onClick={() =>
                onSeatClick({
                  column: idx + 1,
                  row: numberRow,
                  price: place.price,
                })
              }
              active={checkActive(chooseSeats, numberRow, idx + 1)}
            >
              {idx + 1}
            </Seat>
          </div>
        ))}
      </>
    </div>
  );
};

export default RowPlaces;
