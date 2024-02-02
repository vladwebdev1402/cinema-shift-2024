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
  tagTypes: ['TICKET'],
  endpoints: (build) => ({
    getAllOrders: build.query<GetAllOrdersResponse, void>({
      query: () => ({
        url: `/cinema/orders`,
      }),
      providesTags: ['TICKET'],
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
    cancelTicket: build.mutation<void, string>({
      query: (orderId) => ({
        url: '/cinema/orders/cancel',
        body: {
          orderId,
        },
        method: 'PUT',
      }),
      invalidatesTags: ['TICKET'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  usePayTicketMutation,
  useCancelTicketMutation,
} = TicketService;
