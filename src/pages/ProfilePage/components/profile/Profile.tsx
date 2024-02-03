import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import st from './Profile.module.scss';
import { editUser, logout, updateUser } from '@/services/auth-slice';
import { UserForm } from '@/components/UserForm';
import ProfileSkeleton from './ProfileSkeleton';
import { Button, Loader } from '@/ui';
import { IUser } from '@/shared/types/IUser';

const Profile = () => {
  const { user, isLoading } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();

  const handleSubmit = (data: IUser) => {
    if (
      user &&
      (data.firstname !== user.firstname ||
        data.lastname !== user.lastname ||
        user.middlename !== data.middlename)
    ) {
      dispatch(editUser(data));
      dispatch(updateUser(data));
    }
  };

  const onExit = () => {
    dispatch(logout());
  };

  return (
    <>
      <h2 className={st.profile__title}>
        Профиль {user && isLoading && <Loader />}
      </h2>
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
    </>
  );
};

export default Profile;
