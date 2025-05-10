import { Categories, Expenses } from 'interfaces';

export const findExpensesById = (expenses: Expenses[], expensesId: string) =>
  expenses.find(({ id }) => id === expensesId);

export const filterExpensesByCategory = (
  expenses: Expenses[],
  category: Categories,
) => expenses.filter(item => item.category === category);
