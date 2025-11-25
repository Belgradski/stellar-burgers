import {
  fetchOrder,
  fetchOrders,
  createOrder,
  resetOrderModalData,
  ordersInitialState
} from '../src/services/slices';

import reducer from '../src/services/slices/orders';

const ordersMockData = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093d2',
      '643d69a5c3f7b9001cfa09414',
      '643d69a5c3f7b9001cfa093d6'
    ],
    _id: '66322337897ede0001d0666b5',
    status: 'done',
    name: 'GOLODNI_JONI',
    createdAt: '2025-04-19T09:03:52.748Z',
    updatedAt: '2025-04-19T09:03:58.057Z',
    number: 38323
  }
];

describe('Тестирование orderReducer', () => {
  test('Сброс содержимого окна модалки', () => {
    const _initialState = {
      isOrderLoading: true,
      isOrdersLoading: true,
      orderRequest: false,
      orderModalData: ordersMockData[0],
      error: null,
      data: []
    };

    const state = reducer(_initialState, resetOrderModalData());

    expect(state.orderModalData).toBeNull();
    expect(state.data).toHaveLength(0);
    expect(state.error).toBeNull();
    expect(state.isOrderLoading).toBeTruthy();
    expect(state.isOrdersLoading).toBeTruthy();
    expect(state.orderRequest).toBeFalsy();
  });

  describe('Асинхронная функция получения заказа: fetchOrders', () => {
    test('начало запроса : fetchOrders.pending', () => {
      const state = reducer(ordersInitialState, fetchOrders.pending('pending'));

      expect(state.isOrdersLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Успешный запрос: fetchOrders.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        fetchOrders.fulfilled(ordersMockData, 'fulfilled')
      );

      expect(state.data).toEqual(ordersMockData);
      expect(state.error).toBeNull();
      expect(state.isOrdersLoading).toBeFalsy();
    });

    test('Ошибка запроса', () => {
      const error = 'fetchOrders.rejected';

      const state = reducer(
        ordersInitialState,
        fetchOrders.rejected(new Error(error), 'rejected')
      );

      expect(state.error?.message).toEqual(error);
      expect(state.isOrdersLoading).toBeFalsy();
    });
  });

  describe('Асинхронная функция для получения заказа по номеру: fetchOrder', () => {
    test('Начало запроса: fetchOrder.pending', () => {
      const state = reducer(
        ordersInitialState,
        fetchOrder.pending('pending', ordersMockData[0].number)
      );

      expect(state.isOrderLoading).toBeTruthy();
    });

    test('Успешный запрос: fetchOrder.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        fetchOrder.fulfilled(
          ordersMockData[0],
          'fulfilled',
          ordersMockData[0].number
        )
      );

      expect(state.isOrderLoading).toBeFalsy();
      expect(state.orderModalData).toEqual(ordersMockData[0]);
    });
    test('Ошибка запроса: fetchOrder.rejected', () => {
      const error = 'fetchOrder.rejected';

      const state = reducer(
        ordersInitialState,
        fetchOrder.rejected(new Error(error), 'rejected', -1)
      );

      expect(state.isOrderLoading).toBeFalsy();
    });
  });

  describe('Асинхронная функция для создания заказа: createOrder', () => {
    test('Начало запроса: createOrder.pending', () => {
      const state = reducer(
        ordersInitialState,
        createOrder.pending('pending', ordersMockData[0].ingredients)
      );

      expect(state.orderRequest).toBeTruthy();
    });

    test('Успешный запрос: createOrder.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        createOrder.fulfilled(
          {
            order: ordersMockData[0],
            name: 'GOLODNI_JONI'
          },
          'fulfilled',
          ordersMockData[0].ingredients
        )
      );

      expect(state.orderRequest).toBeFalsy();
      expect(state.orderModalData).toEqual(ordersMockData[0]);
    });

    test('Ошибка запроса: createOrder.rejected', () => {
      const error = 'createOrder.rejected';

      const state = reducer(
        ordersInitialState,
        createOrder.rejected(new Error(error), 'rejected', [])
      );

      expect(state.orderRequest).toBeFalsy();
    });
  });
});
