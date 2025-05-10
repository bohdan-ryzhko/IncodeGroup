export type Categories = 'Food' | 'Transport' | 'Entertainments';

export type CategoriesStateType = {
  loading: boolean;
  data: Categories[];
  error: unknown;
};
