import { FC } from 'react';
import st from './Seat.module.scss';
import { TPlaceType } from '@/shared/types';
import classNames from 'classnames';

interface SeatProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: TPlaceType;
  active?: boolean;
}

const Seat: FC<SeatProps> = ({
  type,
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
      <span>{children}</span>
    </button>
  );
};

export default Seat;
