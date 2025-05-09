import { useAppDispatch } from 'hooks';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import {
  clearAuthState,
  clearCategoriesState,
  clearExpensesState,
  clearSettingsState,
  logout,
} from 'store';
import { styles } from './styles';

export const LogoutButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(clearAuthState());
    dispatch(clearCategoriesState());
    dispatch(clearExpensesState());
    dispatch(clearSettingsState());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button
        icon="logout"
        mode="contained-tonal"
        style={styles.button}
        onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};
