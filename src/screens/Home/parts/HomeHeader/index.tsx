import { useMemo } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useReduxStore } from 'hooks';

import { s } from './styles';
import { StackHeaderProps } from '@react-navigation/stack';
import { useNavigationState } from '@react-navigation/native';

export const HomeHeader = ({ navigation }: StackHeaderProps) => {
  const { settings, expenses } = useReduxStore();
  const theme = useTheme();

  const index = useNavigationState(state => state.index);

  const styles = useMemo(() => s(theme), [theme]);

  const preferredCurrency = useMemo(
    () => settings.data?.preferredCurrency,
    [settings.data?.preferredCurrency],
  );

  const sumOfExpenses = useMemo(
    () => expenses.data.reduce((acc, { amount }) => (acc += amount), 0),
    [expenses.data],
  );

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {index > 0 && (
          <IconButton icon="arrow-left" onPress={navigation.goBack} />
        )}
        <Text variant="bodyLarge">
          🏠 Home{', '}
          {sumOfExpenses === 0
            ? 'Currency:'
            : `Expenses: ${sumOfExpenses}`}{' '}
          {preferredCurrency || '(no currency)'}
        </Text>
      </View>
    </View>
  );
};
