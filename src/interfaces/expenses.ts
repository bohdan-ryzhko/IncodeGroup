export type Expenses = {
  id: string;
  amount: number;
  category: string;
  date: string;
  title: string;
  userId: string;
};

export type UpdatePayloadExpenses = { id: string } & Partial<
  Omit<Expenses, 'userId' | 'id'>
>;

export type CreatePayloadExpenses = Omit<Expenses, 'id'>;

export type InitialValuesCreateExpenses = Pick<
  Expenses,
  'category' | 'date' | 'title'
> & {
  amount: string;
};

export type ExpensesStateType = {
  fetching: boolean;
  updating: boolean;
  creating: boolean;
  deleting: boolean;
  data: Expenses[];
  error: unknown;
};
