import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createOrder } from '../../../services/slices/orders';
import { resetConstructor } from '../../../services/slices/builder';
import { AppDispatch, RootState } from '../../../services/store';

const middleware: Middleware =
  (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    if (createOrder.fulfilled.match(action)) {
      store.dispatch(resetConstructor());
    }
    next(action);
  };

export default middleware;
