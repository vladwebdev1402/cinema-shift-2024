import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';

const Root = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Root;
