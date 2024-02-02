import { FC } from 'react';

import { groupedSeatsByRow } from './groupedSeatsByRow';

interface ChoosesSeatsProps {
  seats: { row: number; column: number }[];
  rowClassName?: string;
}

const ChoosesSeats: FC<ChoosesSeatsProps> = ({ seats, rowClassName = '' }) => {
  const groupedChooseSeats = groupedSeatsByRow(seats);

  return (
    <>
      {groupedChooseSeats
        .sort((a, b) => a.row - b.row)
        .map((seats) => (
          <div key={seats.row} className={rowClassName}>
            Ряд {seats.row} -{' '}
            {seats.columns.map((column, idx) => (
              <>
                {column}
                {idx !== seats.columns.length - 1 && ','}
              </>
            ))}
          </div>
        ))}
      {groupedChooseSeats.length === 0 && 'Выберите место'}
    </>
  );
};

export default ChoosesSeats;
