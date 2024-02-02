import { FC } from 'react';
import classNames from 'classnames';

import st from './OrderCard.module.scss';
import { EnumOrderStatus, IOrder } from '@/shared/types';
import { useGetFilmByIdQuery } from '@/services/film-sevice';
import { Button, ChoosesSeats, Skeleton } from '@/ui';
import { convertDate } from './utils/convertDate';

interface OrderCardProps {
  order: IOrder;
}

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { data, isLoading } = useGetFilmByIdQuery(
    (order.tickets[0] && order.tickets[0].filmId) || '',
  );

  const statusClasses = classNames(st.order__status, {
    [st.order__status_payed]: order.status === 'PAYED',
  });

  const onReturnClick = () => {};

  return (
    <div className={st.order}>
      <div className={st.order__date}>
        <span>
          {convertDate(
            (order.tickets[0] && order.tickets[0].seance.date) || '',
          )}
        </span>
        <span>{order.tickets[0] && order.tickets[0].seance.time}</span>
      </div>
      <h3 className={st.order__film}>
        {data && data.film.name}
        {isLoading && <Skeleton className={st.order__film_loading} />}
      </h3>
      <div className={st.order__seats}>
        <ChoosesSeats seats={order.tickets} />
      </div>
      <div className={st.order__info}>
        <div className={statusClasses}>{EnumOrderStatus[order.status]}</div>
        <div className={st.order__code}>Код билета {order.orderNumber}</div>
      </div>
      <Button
        onClick={onReturnClick}
        variant='outlined'
        fullWidth
        className={st.order__return}
      >
        Вернуть билет
      </Button>
    </div>
  );
};

export default OrderCard;
