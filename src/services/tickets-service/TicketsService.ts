import { API_URL } from '@/shared/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetAllOrdersResponse, PayTicket, PayTicketResponse } from './types';
import { TokenService } from '@/shared/api';

export const TicketService = createApi({
  reducerPath: 'TicketService',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.append('Authorization', `Bearer ${TokenService.getToken()}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllOrders: build.query<GetAllOrdersResponse, void>({
      query: () => ({
        url: `/cinema/orders`,
      }),
    }),
    payTicket: build.mutation<PayTicketResponse, PayTicket>({
      query: (order) => ({
        url: `/cinema/payment`,
        method: 'POST',
        body: {
          ...order,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            TicketService.util.updateQueryData(
              'getAllOrders',
              undefined,
              (draft) => {
                draft.orders.push(response.data.order);
              },
            ),
          );
        } catch {}
      },
    }),
  }),
});

export const { useGetAllOrdersQuery, usePayTicketMutation } = TicketService;
