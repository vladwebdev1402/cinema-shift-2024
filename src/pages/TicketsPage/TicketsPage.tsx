import { useGetAllOrdersQuery } from '@/services/tickets-service';
import st from './Tickets.module.scss';
import TicketsSkeleton from './TicketsSkeleton';
import OrderCard from '@/components/OrderCard/OrderCard';
import { useAppSelector } from '@/shared/hooks';
const TicketsPage = () => {
  const { user, isAuth } = useAppSelector((state) => state.UserReducer);
  const { data, isLoading } = useGetAllOrdersQuery(user?.phone || '');
  return (
    <div className={`container ${st.tickets}`}>
      <h2>Билеты</h2>
      <div className={st.tickets__body}>
        {data &&
          data.orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}

        {isLoading && <TicketsSkeleton />}
      </div>
      {data && isAuth && data.orders.length === 0 && (
        <h3>Вы не заказывали никаких билетов</h3>
      )}
      {!isAuth && (
        <h3>Для просмотра билетов необходимо авторизоваться в профиле</h3>
      )}
    </div>
  );
};

export default TicketsPage;
