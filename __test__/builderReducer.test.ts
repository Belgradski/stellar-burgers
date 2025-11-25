import {
  setBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  constructorInitialState
} from '../src/services/slices';

import reducer from '../src/services/slices/builder';

const bunMockData = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const ingredient1MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '1234567890',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const ingredient2MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '0987654321',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

describe('Тестирование builderReducer', () => {
  describe('Ворки с булками', () => {
    test('Установка булочки через setBun', () => {
      const state = reducer(constructorInitialState, setBun(bunMockData));

      expect(state.bun).toEqual(bunMockData);
      expect(state.ingredients).toHaveLength(0);
    });

    test('Устанавливаем булку через addIngredient', () => {
      const state = reducer(
        constructorInitialState,
        addIngredient(bunMockData)
      );
      const updateObject = { ...state.bun } as Record<string, any>;
      delete updateObject.id;

      expect(updateObject).toEqual(bunMockData);
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('Ворки с ингредиентами', () => {
    test('Добавление ингредиента', () => {
      const state = reducer(
        constructorInitialState,
        addIngredient(ingredient1MockData)
      );

      expect(state.ingredients).toHaveLength(1);

      const updateObject = { ...state.ingredients[0] } as Record<string, any>;
      delete updateObject.id;

      const initialObject = { ...ingredient1MockData } as Record<string, any>;
      delete initialObject.id;

      expect(updateObject).toEqual(initialObject);
      expect(state.bun).toBeNull();
    });

    test('Удаление ингредиента', () => {
      const _initialState = {
        bun: null,
        ingredients: [ingredient1MockData, ingredient2MockData]
      };
      const state = reducer(
        _initialState,
        removeIngredient(ingredient1MockData.id)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient2MockData);
      expect(state.bun).toBeNull();
    });
    test('Очистка конструктора', () => {
      const _initialState = {
        bun: bunMockData,
        ingredients: [ingredient1MockData, ingredient2MockData]
      };

      const state = reducer(_initialState, resetConstructor());

      expect(state.ingredients).toHaveLength(0);
      expect(state.bun).toBeNull();
    });
  });
});
