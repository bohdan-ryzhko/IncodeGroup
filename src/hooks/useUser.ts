import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import { useState } from 'react';
import { useAppDispatch } from 'hooks';
import { setUser } from 'store';

const auth = getAuth();

export const useUser = () => {
  const dispatch = useAppDispatch();
  const [user, setAuthUser] = useState<FirebaseAuthTypes.User | null>(null);

  onAuthStateChanged(auth, authUser => {
    setAuthUser(authUser);
    dispatch(setUser(authUser));
  });

  return user;
};
