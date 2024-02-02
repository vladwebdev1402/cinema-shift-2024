import { useEffect } from 'react';
import { Header } from '@/components/header';
import { clearAfterAuth, getUserSession } from '@/services/auth-slice';
import { ROUTER_PATHS } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Outlet, useNavigate } from 'react-router-dom';

const Root = () => {
  const { isAuth, code, user } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && code) {
      dispatch(clearAfterAuth());
      navigate(ROUTER_PATHS.profile);
    }
  }, [user, code]);

  useEffect(() => {
    if (isAuth) dispatch(getUserSession());
  }, [isAuth]);

  return (
    <>
      <Header />
      <Outlet />
      <footer></footer>
    </>
  );
};

export default Root;
