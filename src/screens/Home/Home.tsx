import { FC } from 'react';
import { ExpensesDetails } from './parts';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeRoot } from './root';

const Stack = createStackNavigator();

export const Home: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeRoot} />
      <Stack.Screen name="expenses-details" component={ExpensesDetails} />
    </Stack.Navigator>
  );
};
