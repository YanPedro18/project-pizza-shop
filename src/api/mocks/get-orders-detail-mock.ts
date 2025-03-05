import { http, HttpResponse } from 'msw';
import { OrderDetailsParams, OrderDetailsResponse } from '../get-order-details';

export const getOrderDetailsMock = http.get<OrderDetailsParams, never, OrderDetailsResponse>(
  '/orders/:orderId', // Rota com parâmetro
  ({ params }) => {
    return HttpResponse.json({
      id: params.orderId,
      customer: {
        name: 'John Doe',
        email: 'johndo@example.com',
        phone: '12312423466',
      },
      status: 'pending', // Status do pedido
      createdAt: new Date().toISOString(), // Data de criação gerada dinamicamente
      totalInCents: 5000,
      orderItems: [ // Lista de items no pedido
        {
          id: 'order-item-1',
          priceInCents: 5000,
          product: { name: 'Pizza Pepperoni' },
          quantity: 1,
        },
        {
          id: 'order-item-2',
          priceInCents: 3000,
          product: { name: 'Pizza Pepperonii' }, // Corrigido a falta da vírgula
          quantity: 2,
        }
      ]
    });
  }
);
