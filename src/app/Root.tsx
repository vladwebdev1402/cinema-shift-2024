import { useEffect } from 'react';
import { Header } from '@/components/header';
import { clearAfterAuth, getUserSession } from '@/services/auth-slice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Outlet } from 'react-router-dom';

const Root = () => {
  const { isAuth, code } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth && code) {
      dispatch(clearAfterAuth());
    }
  }, [isAuth, code]);

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
