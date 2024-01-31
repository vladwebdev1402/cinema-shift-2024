import { Skeleton } from '@/ui';
import st from './DetailSkeleton.module.scss';

const DetailSkeleton = () => {
  return (
    <>
      <Skeleton className={st.head} />
      <div className={st.body}>
        <Skeleton className={st.title} />
        <Skeleton className={st.subtitle} />

        <Skeleton className={st.rating} />
        <Skeleton className={st.subtitle} />
        <Skeleton className={st.description} />
      </div>
    </>
  );
};

export default DetailSkeleton;
