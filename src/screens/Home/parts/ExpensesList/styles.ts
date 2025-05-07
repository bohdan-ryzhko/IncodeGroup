import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const s = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
    backTextWhite: {
      color: '#FFF',
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
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
  });
