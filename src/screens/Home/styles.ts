import { StyleSheet } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const s = (theme: ThemeProp) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.colors?.background,
    },
  });
