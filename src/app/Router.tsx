import { routerPaths } from '@/shared/constants';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Root from './Root';
import { MainPage } from '@/pages/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routerPaths.main} element={<Root />}>
      <Route index element={<MainPage />} />
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
