import React, { FC } from 'react';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';

import { SignUpScreen, LoginScreen } from 'screens';
import { routes } from 'consts';

import { GradientBackground } from 'components';

const Tab = createMaterialTopTabNavigator();

export const AuthNavigation: FC = () => {
  const theme = useTheme();

  return (
    <GradientBackground>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingTop: Platform.OS === 'android' ? 30 : 0,
            backgroundColor: theme.colors.inverseOnSurface,
          },
          tabBarPressColor: theme.colors.primaryContainer,
        }}>
        <Tab.Screen name={routes.signUp} component={SignUpScreen} />
        <Tab.Screen name={routes.login} component={LoginScreen} />
      </Tab.Navigator>
    </GradientBackground>
  );
};
