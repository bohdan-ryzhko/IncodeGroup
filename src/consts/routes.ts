import { Values } from 'interfaces';

export const routes = {
  login: 'login',
  signUp: 'signUp',
  home: 'home',
  settings: 'settings',
  currency: 'currency',
  account: 'account',
  expensesDetails: 'expenses-details',
} as const;

export type RoutesType = typeof routes;

export type Routes = Values<RoutesType>;
