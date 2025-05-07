import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SignUpScreen, LoginScreen } from 'screens';
import { routes } from 'consts';

import { styles } from './styles';

const Tab = createMaterialTopTabNavigator();

export const AuthNavigation: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name={routes.signUp} component={SignUpScreen} />
        <Tab.Screen name={routes.login} component={LoginScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
