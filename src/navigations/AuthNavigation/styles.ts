import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const s = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.inverseOnSurface,
    },
  });
