import { useEffect } from 'react';
import './App.scss';
import '@/shared/styles/fonts.scss';
import Router from './Router';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getUserSession } from '@/services/auth-slice';

const App = () => {
  const { isAuth } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) dispatch(getUserSession());
  }, [isAuth]);

  return <Router />;
};
export default App;
