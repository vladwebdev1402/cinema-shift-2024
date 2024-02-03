import { useAppSelector } from '@/shared/hooks';
import st from './ProfilePage.module.scss';
import Profile from './components/profile/Profile';
import AuthByPhone from './components/auth-by-phone/AuthByPhone';

const ProfilePage = () => {
  const { isAuth } = useAppSelector((state) => state.UserReducer);

  return (
    <div className={`container ${st.profile}`}>
      {isAuth && <Profile />}
      {!isAuth && <AuthByPhone />}
    </div>
  );
};

export default ProfilePage;
