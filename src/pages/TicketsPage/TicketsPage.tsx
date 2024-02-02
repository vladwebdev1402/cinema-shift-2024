import { useGetAllOrdersQuery } from '@/services/tickets-service';
import st from './Tickets.module.scss';
import TicketsSkeleton from './TicketsSkeleton';
import OrderCard from '@/components/OrderCard/OrderCard';
const TicketsPage = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();
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
    </div>
  );
};

export default TicketsPage;
