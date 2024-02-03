import { Skeleton } from '@/ui';
import st from './Tickets.module.scss';

const TicketsSkeleton = () => {
  return (
    <>
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
    </>
  );
};

export default TicketsSkeleton;
