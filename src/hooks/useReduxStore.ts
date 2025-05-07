import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useReduxStore = (): RootState => ({
  auth: useSelector((state: RootState) => state.auth),
  categories: useSelector((state: RootState) => state.categories),
  expenses: useSelector((state: RootState) => state.expenses),
});
