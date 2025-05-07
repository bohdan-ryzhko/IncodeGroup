import { useAppDispatch, useReduxStore } from 'hooks';
import { FC, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native';

import { getCategories, getExpenses } from 'store';

import { CreateExpenses, ExpensesList } from './parts';
import { styles } from './styles';

export const HomeScreen: FC = () => {
  const { auth } = useReduxStore();
  const dispatch = useAppDispatch();

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
      <ExpensesList />

      <CreateExpenses />
    </SafeAreaView>
  );
};
