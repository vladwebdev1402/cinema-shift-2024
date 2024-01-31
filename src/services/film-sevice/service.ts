import { apiUrl } from '@/shared/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodayFilmResponse, IFilmByIdResponse, IFilmScheduleResponse } from './type';

export const FilmService = createApi({
  reducerPath: 'AfishaService',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (build) => ({
    getFilmsToday: build.query<ITodayFilmResponse, void>({
      query: () => '/cinema/today',
    }),
    getFilmById: build.query<IFilmByIdResponse, string>({
      query: (id) => `cinema/film/${id}`,
    }),
    getSheduleByid: build.query<IFilmScheduleResponse, string>({
      query: (id) => `cinema/film/${id}/schedule`,
    })
  }),
});

export const { useGetFilmsTodayQuery, useGetFilmByIdQuery, useGetSheduleByidQuery } = FilmService;
