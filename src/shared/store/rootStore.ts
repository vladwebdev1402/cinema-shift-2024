import { CinemaService } from '@/services/film-sevice';
import { configureStore, combineReducers } from '@reduxjs/toolkit/react';

const reducers = combineReducers({
  [CinemaService.reducerPath]: CinemaService.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CinemaService.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch