import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesType } from 'consts';

type RouteKeys = keyof RoutesType;

type BaseRoutes = {
  [key in RouteKeys]: undefined;
};

type ExtendedRoutes = {
  'expenses-details': { id: string };
};

type HomeStackParamList = BaseRoutes & ExtendedRoutes;

type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export const useHomeNavigation = () => useNavigation<HomeStackNavigationProp>();
