import { Skeleton } from '@/ui';
import st from './ScheduleSkeletons.module.scss';

const ScheduleSkeletons = () => {
  return (
    <>
      <Skeleton className={st.schedule} />
      <Skeleton className={st.hall} />
      <Skeleton className={st.times} />
      <Skeleton className={st.hall} />
      <Skeleton className={st.times} />
      <Skeleton className={st.hall} />
      <Skeleton className={st.times} />
    </>
  );
};

export default ScheduleSkeletons;
