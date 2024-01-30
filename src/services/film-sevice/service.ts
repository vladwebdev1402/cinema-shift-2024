import { apiUrl } from '@/shared/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAllFilmResponse, IFilmByIdResponse } from './type';

export const AfishaService = createApi({
  reducerPath: 'AfishaService',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (build) => ({
    getAllFilms: build.query<IAllFilmResponse, void>({
      query: () => '/cinema/today',
    }),
    getFilmById: build.query<IFilmByIdResponse, string>({
      query: (id) => `cinema/film/${id}`,
    }),
  }),
});

export const { useGetAllFilmsQuery, useGetFilmByIdQuery } = AfishaService;
