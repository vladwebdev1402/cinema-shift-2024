import { Provider } from 'react-redux';

import './App.scss';
import '@/shared/styles/fonts.scss';
import Router from './Router';
import { store } from '@/shared/store';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
export default App;
