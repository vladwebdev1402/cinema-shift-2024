import { UserReducer } from '@/services/auth-slice';
import { CinemaService } from '@/services/film-sevice';
import { TicketService } from '@/services/tickets-service';
import { configureStore, combineReducers } from '@reduxjs/toolkit/react';
const reducers = combineReducers({
  [CinemaService.reducerPath]: CinemaService.reducer,
  [TicketService.reducerPath]: TicketService.reducer,
  UserReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CinemaService.middleware,
      TicketService.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
