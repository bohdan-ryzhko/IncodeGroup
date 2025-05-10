import { FC } from 'react';
import { ExpensesDetails, HomeHeader } from './parts';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';

import { HomeRoot } from './root';

const Stack = createStackNavigator();

const header = (props: StackHeaderProps) => <HomeHeader {...props} />;

export const Home: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header }}>
      <Stack.Screen name="home" component={HomeRoot} />
      <Stack.Screen name="expenses-details" component={ExpensesDetails} />
    </Stack.Navigator>
  );
};
