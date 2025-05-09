import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { categoriesReducer } from './categories';
import { expensesReducer } from './expenses';
import { settingsReducer } from './settings';

const reducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  expenses: expensesReducer,
  settings: settingsReducer,
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
