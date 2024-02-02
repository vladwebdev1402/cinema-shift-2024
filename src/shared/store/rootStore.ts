import { UserReducer } from '@/services/auth-slice';
import { CinemaService } from '@/services/film-sevice';
import { configureStore, combineReducers } from '@reduxjs/toolkit/react';
const reducers = combineReducers({
  [CinemaService.reducerPath]: CinemaService.reducer,
  UserReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CinemaService.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch