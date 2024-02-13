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
    getAllOrders: build.query<GetAllOrdersResponse, string>({
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
      async onQueryStarted(order, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            TicketService.util.updateQueryData(
              'getAllOrders',
              order.person.phone,
              (draft) => {
                draft.orders.push(response.data.order);
              },
            ),
          );
        } catch {}
      },
    }),
    cancelTicket: build.mutation<void, { phone: string; orderId: string }>({
      query: (order) => ({
        url: '/cinema/orders/cancel',
        body: {
          orderId: order.orderId,
        },
        method: 'PUT',
      }),
      onQueryStarted(order, { dispatch, queryFulfilled }) {
        const resultPatch = dispatch(
          TicketService.util.updateQueryData(
            'getAllOrders',
            order.phone,
            (draft) => {
              const oldOrder = draft.orders.find(
                (arrOrder) => arrOrder._id === order.orderId,
              );
              if (oldOrder) {
                oldOrder.status = 'CANCELED';
                oldOrder.tickets = [];
              }
            },
          ),
        );
        queryFulfilled.catch(resultPatch.undo);
      },
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useLazyGetAllOrdersQuery,
  usePayTicketMutation,
  useCancelTicketMutation,
} = TicketService;
