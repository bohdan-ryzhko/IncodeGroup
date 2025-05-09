import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';

export const s = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 15,
    },
    list: {
      backgroundColor: theme.colors.inverseOnSurface,
      borderRadius: 8,
    },
    button: {
      borderRadius: 8,
      width: '100%',
      borderBottomColor: theme.colors.inversePrimary,
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      justifyContent: 'center',
    },
    buttonContent: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    },
    icon: {
      marginLeft: 'auto',
      alignSelf: 'center',
    },
  });
