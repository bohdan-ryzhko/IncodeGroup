import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const s = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: theme.colors.inverseOnSurface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.inversePrimary,
      justifyContent: 'center',
      height: 50,
    },
    topItem: {
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
    },
    bottomItem: {
      borderBottomEndRadius: 8,
      borderBottomStartRadius: 8,
    },
    rowBack: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
    backRightBtn: {
      margin: 0,
      borderRadius: 0,
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 50,
      height: '100%',
    },
    backRightBtnLeft: {
      backgroundColor: theme.colors.primaryContainer,
      right: 50,
    },
    backRightBtnRight: {
      backgroundColor: theme.colors.errorContainer,
      right: 0,
    },
    item: {
      position: 'relative',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    category: {
      position: 'absolute',
      marginLeft: 'auto',
      right: 20,
    },
  });
