import { FC, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AlertCurrency } from 'screens';
import { useReduxStore } from 'hooks';

import { Home } from './Home';
import { HomeHeader } from './parts';

const RootStack = createStackNavigator();

const header = () => <HomeHeader />;

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
    <RootStack.Navigator screenOptions={{ header }}>
      <RootStack.Group>
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name="AlertCurrency"
          component={AlertCurrency}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
