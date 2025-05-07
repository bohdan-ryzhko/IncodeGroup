import { Expenses } from 'interfaces';

export const findExpensesById = (expenses: Expenses[], expensesId: string) =>
  expenses.find(({ id }) => id === expensesId);
