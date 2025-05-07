import {
  FirebaseAuthTypes,
  getAuth,
  signOut,
} from '@react-native-firebase/auth';
import { UserInfo } from 'interfaces';
import { ThunkWrapper } from 'store/helpers';

const auth = getAuth();

export const signUp = ThunkWrapper<FirebaseAuthTypes.User, UserInfo>(
  'auth/sighUp',
  async ({ email, password }) => {
    const createdUser = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );

    return createdUser.user;
  },
);

export const login = ThunkWrapper<FirebaseAuthTypes.User, UserInfo>(
  'auth/login',
  async ({ email, password }) => {
    const loggedInUser = await auth.signInWithEmailAndPassword(email, password);

    return loggedInUser.user;
  },
);

export const logout = ThunkWrapper('auth/logout', async () => {
  await signOut(auth);
});
