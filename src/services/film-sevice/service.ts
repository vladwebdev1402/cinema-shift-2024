import { API_URL } from '@/shared/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IFilmByIdResponse,
  IFilmScheduleResponse,
  ITodayFilmResponse,
} from './type';

export const CinemaService = createApi({
  reducerPath: 'CinemaService',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getFilmsToday: build.query<ITodayFilmResponse, void>({
      query: () => '/cinema/today',
    }),
    getFilmById: build.query<IFilmByIdResponse, string>({
      query: (id) => `/cinema/film/${id}`,
    }),
    getSсheduleByid: build.query<IFilmScheduleResponse, string>({
      query: (id) => `/cinema/film/${id}/schedule`,
    }),
  }),
});

export const {
  useGetFilmsTodayQuery,
  useGetFilmByIdQuery,
  useGetSсheduleByidQuery,
} = CinemaService;
