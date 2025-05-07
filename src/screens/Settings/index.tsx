import { useAppDispatch } from 'hooks';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import {
  clearAuthState,
  clearCategoriesState,
  clearExpensesState,
  logout,
} from 'store';

export const SettingsScreen: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(clearAuthState());
    dispatch(clearCategoriesState());
    dispatch(clearExpensesState());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>

      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};
