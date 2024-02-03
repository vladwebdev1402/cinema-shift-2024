import { FC } from 'react';
import st from './Seat.module.scss';
import { TPlaceType } from '@/shared/types';
import classNames from 'classnames';

interface SeatProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: TPlaceType;
  price: number;
  row: number;
  column: number;
  active?: boolean;
}

const Seat: FC<SeatProps> = ({
  type,
  column,
  price,
  row,
  active = false,
  onClick,
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = classNames(className, st.button, {
    [st.button_active]: active,
  });

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={type === 'BLOCKED'}
      className={buttonClasses}
    >
      <div className={st.seat__info}>
        <div className={st.seat__price}>{price} ₽</div>
        <div className={st.seat__place}>
          {row} ряд, {column} место
        </div>
      </div>
      <span>{children}</span>
    </button>
  );
};

export default Seat;
