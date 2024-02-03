import { Skeleton } from '@/ui';
import st from './Profile.module.scss';
const ProfileSkeleton = () => {
  return (
    <>
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
      <Skeleton className={st.skeleton} />
      <Skeleton className={`${st.skeleton} ${st.skeleton__btn}`} />
    </>
  );
};

export default ProfileSkeleton;
