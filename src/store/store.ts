import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { categoriesReducer } from './categories';
import { expensesReducer } from './expenses';

const reducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  expenses: expensesReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
