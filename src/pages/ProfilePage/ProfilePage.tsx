import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import st from './ProfilePage.module.scss';
import ProfileSkeleton from './ProfileSkeleton';
import UserForm from '@/components/UserForm/UserForm';
import { IUser } from '@/shared/types/IUser';
import { Button } from '@/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/constants';
import { editUser, logout, updateUser } from '@/services/auth-slice';
const ProfilePage = () => {
  const { user, isLoading } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: IUser) => {
    dispatch(editUser(data));
    dispatch(updateUser(data));
  };

  const onExit = () => {
    navigate(ROUTER_PATHS.main);
    dispatch(logout());
  };

  return (
    <div className={`container ${st.profile}`}>
      <h2>Профиль</h2>
      <div className={st.profile__body}>
        {user && (
          <UserForm
            user={user}
            handleUserSubmit={handleSubmit}
            disablePhone
            buttonText='Обновить данные'
          />
        )}
        {!user && isLoading && <ProfileSkeleton />}
        <Button
          fullWidth
          className={st.profile__logout}
          variant='outlined'
          onClick={onExit}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
