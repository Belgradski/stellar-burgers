import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from '../slices/ingredients';
import builderReducer from '../slices/builder';
import ordersReducer from '../slices/orders';
import feedsReducer from '../slices/feeds';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  builder: builderReducer,
  orders: ordersReducer,
  feeds: feedsReducer
});
// Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
