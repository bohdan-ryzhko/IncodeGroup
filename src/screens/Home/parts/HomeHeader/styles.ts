import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const s = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      height: 100,
      backgroundColor: theme.colors.inverseOnSurface,
      justifyContent: 'flex-end',
      paddingBottom: 10,
      paddingHorizontal: 15,
      borderBottomEndRadius: 16,
      borderBottomStartRadius: 16,
    },
  });
