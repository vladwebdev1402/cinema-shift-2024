import { FC, useMemo } from 'react';
import classNames from 'classnames';

import st from './OrderCard.module.scss';
import { EnumOrderStatus, IOrder } from '@/shared/types';
import { useGetFilmByIdQuery } from '@/services/film-sevice';
import { Button, ChoosesSeats, Skeleton } from '@/ui';
import { convertDate } from './utils/convertDate';
import { useCancelTicketMutation } from '@/services/tickets-service';
import { formateDate } from '@/shared/utils';
import { useAppSelector } from '@/shared/hooks';

interface OrderCardProps {
  order: IOrder;
}

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { user } = useAppSelector((state) => state.UserReducer);
  const [cancelTicket, { isLoading: cancelLoading }] =
    useCancelTicketMutation();
  const { data, isLoading } = useGetFilmByIdQuery(
    (order.tickets[0] && order.tickets[0].filmId) || '',
  );

  const statusClasses = classNames(st.order__status, {
    [st.order__status_payed]: order.status === 'PAYED',
    [st.order__status_cancaled]: order.status === 'CANCELED',
  });

  const isSessionPassed = useMemo(() => {
    if (order.tickets.length > 0 && order.tickets[0].seance) {
      return (
        new Date().getTime() -
          formateDate(order.tickets[0].seance.date).getTime() >
        0
      );
    }
    return true;
  }, [order]);

  const onReturnClick = () => {
    if (user) cancelTicket({ phone: user.phone, orderId: order._id });
  };

  return (
    <div className={st.order}>
      {order.tickets.length > 0 && order.tickets[0].seance && (
        <div className={st.order__date}>
          <span>{convertDate(order.tickets[0].seance.date || '')}</span>
          <span>{order.tickets[0].seance.time}</span>
        </div>
      )}

      <h3 className={st.order__film}>
        {data && data.film.name}
        {isLoading && <Skeleton className={st.order__film_loading} />}
      </h3>
      {order.tickets.length > 0 && order.tickets[0].row && (
        <div className={st.order__seats}>
          <ChoosesSeats seats={order.tickets} />
        </div>
      )}
      <div className={st.order__info}>
        <div className={statusClasses}>{EnumOrderStatus[order.status]}</div>
        <div className={st.order__code}>Код билета {order.orderNumber}</div>
      </div>
      {order.status === 'PAYED' && order.tickets[0].seance && (
        <Button
          onClick={onReturnClick}
          variant='outlined'
          fullWidth
          className={st.order__return}
          loading={cancelLoading}
          disabled={isSessionPassed}
        >
          {isSessionPassed ? 'Сеанс уже прошёл' : 'Вернуть билет'}
        </Button>
      )}
    </div>
  );
};

export default OrderCard;
