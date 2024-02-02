import { FC } from 'react';
import { IOrder } from '@/shared/types/IOrder';
import AcceptImg from '@/shared/assets/Accept.jpg';
import st from './FilmBuyTicket.module.scss';
import { useGetFilmByIdQuery } from '@/services/film-sevice';
import { useParams } from 'react-router-dom';
import { Button, ChoosesSeats, DateSchedule } from '@/ui';
import { ScheduleState } from '../../types/ScheduleState';
interface OrderInfoProps {
  order: IOrder;
  schedule: ScheduleState;
}

const OrderInfo: FC<OrderInfoProps> = ({ order, schedule }) => {
  const params = useParams<{ id: string }>();
  const { currentData } = useGetFilmByIdQuery(params.id || '');

  return (
    <div>
      <div className={st.info__header}>
        <img src={AcceptImg} />
        <h2>Оплата прошла успешно</h2>
      </div>

      <div className={st.info__item}>
        <div className={st.info__title}>Номер билета</div>
        <div className={st.info__value}>{order.orderNumber}</div>
      </div>
      <div className={st.info__item}>
        <div className={st.info__title}>Фильм</div>
        <div className={st.info__value}>
          {currentData && currentData.film.name}
        </div>
      </div>
      <div className={st.info__item}>
        <div className={st.info__title}>Дата и время</div>
        <div className={st.info__value}>
          <DateSchedule date={schedule.date} time={schedule.time} />
        </div>
      </div>
      <div className={st.info__item}>
        <div className={st.info__title}>Места</div>
        <div className={st.info__value}>
          <ChoosesSeats seats={order.tickets} />
        </div>
      </div>
      <Button variant='text' className={st.info__button} fullWidth>
        Вернуться в личный кабинет
      </Button>
    </div>
  );
};

export default OrderInfo;
