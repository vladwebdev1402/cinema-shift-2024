import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Root from './Root';
import { MainPage } from '@/pages/MainPage';
import { FilmDetailPage } from '@/pages/FilmDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ROUTER_PATHS } from '@/shared/constants';
import { TicketsPage } from '@/pages/TicketsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTER_PATHS.main} element={<Root />}>
      <Route index element={<MainPage />} />
      <Route path={ROUTER_PATHS.filmDetail} element={<FilmDetailPage />} />
      <Route path={ROUTER_PATHS.profile} element={<ProfilePage />} />
      <Route path={ROUTER_PATHS.tickets} element={<TicketsPage />} />
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
