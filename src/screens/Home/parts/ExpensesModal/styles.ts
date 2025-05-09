import { StyleSheet } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const s = (theme: ThemeProp) =>
  StyleSheet.create({
    modalBody: {
      backgroundColor: theme.colors?.background,
      padding: 20,
      marginHorizontal: 15,
    },
  });
