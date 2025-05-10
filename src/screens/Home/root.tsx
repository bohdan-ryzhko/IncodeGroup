import { FC, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useAppDispatch, useReduxStore } from 'hooks';
import { getCategories, getExpenses } from 'store';

import {
  CategoriesFilter,
  CreateExpenses,
  EmptyView,
  ExpensesList,
} from './parts';

import { s } from './styles';
import { Categories } from 'interfaces';
import { filterExpensesByCategory } from 'utils';

export const HomeRoot: FC = () => {
  const { auth, expenses } = useReduxStore();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [filterValue, setFilterValue] = useState<Categories | null>(null);

  const styles = useMemo(() => s(theme), [theme]);

  const userId = useMemo(() => auth.user?.uid, [auth.user?.uid]);

  const computedExpenses = useMemo(() => {
    return filterValue
      ? filterExpensesByCategory(expenses.data, filterValue)
      : expenses.data;
  }, [expenses.data, filterValue]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(getExpenses(userId));
  }, [dispatch, userId]);

  const expensesAreEmpty = useMemo(
    () => expenses.data.length === 0,
    [expenses.data.length],
  );

  return (
    <SafeAreaView style={styles.container}>
      {!expensesAreEmpty && (
        <CategoriesFilter
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      )}

      {computedExpenses.length === 0 ? (
        <EmptyView />
      ) : (
        <ExpensesList computedExpenses={computedExpenses} />
      )}

      <CreateExpenses />
    </SafeAreaView>
  );
};
