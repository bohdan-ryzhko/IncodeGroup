import { useNavigation } from '@react-navigation/native';
import { UserInfo } from 'interfaces';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  login?: UserInfo;
  signUp?: UserInfo;
  home: undefined;
};

type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export const useAuthNavigation = () => useNavigation<AuthStackNavigationProp>();
