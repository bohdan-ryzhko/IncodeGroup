import { Values } from 'interfaces';

export const routes = {
  login: 'login',
  signUp: 'signUp',
  home: 'home',
  settings: 'settings',
  currency: 'currency',
} as const;

export type RoutesType = typeof routes;

export type Routes = Values<RoutesType>;
