import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeRootStackParamList = {
  AlertCurrency: undefined;
  Home: undefined;
};

type HomeRootStackNavigationProp =
  NativeStackNavigationProp<HomeRootStackParamList>;

export const useHomeRootNavigation = () =>
  useNavigation<HomeRootStackNavigationProp>();
