import { FC, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AlertCurrency } from 'screens';
import { useReduxStore } from 'hooks';

import { Home } from './Home';
import { Platform } from 'react-native';

const RootStack = createStackNavigator();

export const HomeScreen: FC = () => {
  const { settings } = useReduxStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (settings.data?.preferredCurrency) {
      return;
    }

    navigation.navigate('AlertCurrency');
  }, [navigation, settings.data?.preferredCurrency]);

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name="AlertCurrency"
          component={AlertCurrency}
          options={{ title: '', headerShown: Platform.OS === 'android' }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
