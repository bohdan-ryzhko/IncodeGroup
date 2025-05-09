import { FC, useMemo } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useReduxStore } from 'hooks';

import { s } from './styles';

export const HomeHeader: FC = () => {
  const { settings, expenses } = useReduxStore();
  const theme = useTheme();

  const styles = useMemo(() => s(theme), [theme]);

  const sumOfExpenses = useMemo(
    () => expenses.data.reduce((acc, { amount }) => (acc += amount), 0),
    [expenses.data],
  );

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">
        🏠 Home{', '}
        {sumOfExpenses === 0 ? 'Currency:' : `Expenses: ${sumOfExpenses}`}{' '}
        {settings.data?.preferredCurrency && settings.data?.preferredCurrency}
        {!settings.data?.preferredCurrency && '(select currency in settings)'}
      </Text>
    </View>
  );
};
