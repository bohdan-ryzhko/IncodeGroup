import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsRoot } from './root';
import { AccountScreen, CurrencyScreen } from 'screens';
import { routes } from 'consts';

const Stack = createStackNavigator();

export const SettingsScreen: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.settings} component={SettingsRoot} />
      <Stack.Screen name={routes.currency} component={CurrencyScreen} />
      <Stack.Screen name={routes.account} component={AccountScreen} />
    </Stack.Navigator>
  );
};
