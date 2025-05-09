import { FC, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { CreateExpenses, EmptyView, ExpensesList } from './parts';
import { useTheme } from 'react-native-paper';

import { useAppDispatch, useReduxStore } from 'hooks';
import { getCategories, getExpenses } from 'store';
import { s } from './styles';

export const HomeRoot: FC = () => {
  const { auth, expenses } = useReduxStore();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const styles = useMemo(() => s(theme), [theme]);

  const userId = useMemo(() => auth.user?.uid, [auth.user?.uid]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(getExpenses(userId));
  }, [dispatch, userId]);

  return (
    <SafeAreaView style={styles.container}>
      {expenses.data.length === 0 ? <EmptyView /> : <ExpensesList />}

      <CreateExpenses />
    </SafeAreaView>
  );
};
