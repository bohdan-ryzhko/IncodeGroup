import { StyleSheet } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const s = (theme: ThemeProp) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: theme.colors?.backdrop,
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    label: {
      textAlign: 'center',
      marginBottom: 10,
      fontWeight: '600',
      fontSize: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
  });
