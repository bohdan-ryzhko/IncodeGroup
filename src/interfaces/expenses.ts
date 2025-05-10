import { Categories } from './categories';

export type Expenses = {
  id: string;
  amount: number;
  category: Categories;
  date: string;
  title: string;
  userId: string;
};

export type UpdatePayloadExpenses = { id: string } & Partial<
  Omit<Expenses, 'userId' | 'id'>
>;

export type CreatePayloadExpenses = Omit<Expenses, 'id'>;

export type InitialValuesCreateExpenses = Pick<Expenses, 'date' | 'title'> & {
  amount: string;
  category: Categories | '';
};

export type ExpensesStateType = {
  fetching: boolean;
  updating: boolean;
  creating: boolean;
  deleting: boolean;
  data: Expenses[];
  error: unknown;
};
