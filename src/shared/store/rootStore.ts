import { FilmService } from '@/services/film-sevice';
import { configureStore, combineReducers } from '@reduxjs/toolkit/react';

const reducers = combineReducers({
  [FilmService.reducerPath]: FilmService.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FilmService.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch