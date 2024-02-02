import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Root from './Root';
import { MainPage } from '@/pages/MainPage';
import { FilmDetailPage } from '@/pages/FilmDetailPage';
import { AuthPage } from '@/pages/AuthPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ROUTER_PATHS } from '@/shared/constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTER_PATHS.main} element={<Root />}>
      <Route index element={<MainPage />} />
      <Route path={ROUTER_PATHS.filmDetail} element={<FilmDetailPage />} />
      <Route path={ROUTER_PATHS.profile} element={<ProfilePage />} />
      <Route path={ROUTER_PATHS.auth} element={<AuthPage />} />
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
