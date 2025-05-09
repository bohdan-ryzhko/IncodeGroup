import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import { firestoreCollections } from 'consts';
import { Settings, UpdateSettingsPayload } from 'interfaces';
import { ThunkWrapper } from 'store/helpers';

const defaultSettings: Settings = {
  preferredCurrency: null,
};

const db = getFirestore();

export const getAllSettings = ThunkWrapper<Settings, string>(
  'get/settings',
  async userId => {
    const ref = doc(db, firestoreCollections.settings, userId);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      throw new Error('Settings not found');
    }

    return snapshot.data() as Settings;
  },
  {
    showNotification: false,
  },
);

export const initializeSettings = ThunkWrapper<Settings, string>(
  'initialize/settings',
  async userId => {
    const ref = doc(db, firestoreCollections.settings, userId);

    await setDoc(ref, defaultSettings);

    const snapshot = await getDoc(ref);

    console.log('snapshot', snapshot);

    if (!snapshot.exists()) {
      throw new Error('Settings not found');
    }

    return snapshot.data() as Settings;
  },
);

export const updateSettings = ThunkWrapper<Settings, UpdateSettingsPayload>(
  'update/settings',
  async ({ userId, settings }) => {
    const ref = doc(db, firestoreCollections.settings, userId);

    await updateDoc(ref, settings);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      throw new Error(`Expense with id "${userId}" not found`);
    }

    return snapshot.data() as Settings;
  },
);
