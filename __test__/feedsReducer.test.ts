import { fetchFeeds, feedsInitialState } from '../src/services/slices';

import reducer from '../src/services/slices/feeds';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('Тестирование feedsReducer', () => {
  describe('Асинхронная функция для получения ленты заказов: fetchFeeds', () => {
    test('начало запроса: pending', () => {
      const state = reducer(feedsInitialState, fetchFeeds.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса успешный: fulfilled', () => {
      const state = reducer(
        feedsInitialState,
        fetchFeeds.fulfilled(feedsMockData, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.data).toEqual(feedsMockData);
      expect(state.error).toBeNull();
    });

    test('Ошибка запроса: rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = reducer(
        feedsInitialState,
        fetchFeeds.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});
