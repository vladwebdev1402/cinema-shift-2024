import st from './Afisha.module.scss';
import { Skeleton } from '@/ui';
const AfishaSkeleton = () => (
  <>
    <Skeleton className={st.afisha__skeleton} />
    <Skeleton className={st.afisha__skeleton} />
    <Skeleton className={st.afisha__skeleton} />
    <Skeleton className={st.afisha__skeleton} />
    <Skeleton className={st.afisha__skeleton} />
    <Skeleton className={st.afisha__skeleton} />
  </>
);

export default AfishaSkeleton;
