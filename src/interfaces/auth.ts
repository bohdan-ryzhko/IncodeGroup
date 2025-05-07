import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type AuthState = {
  creating: boolean;
  loading: boolean;
  loggingIn: boolean;
  user: FirebaseAuthTypes.User | null;
  error: unknown;
};

export type UserInfo = {
  email: string;
  password: string;
};
