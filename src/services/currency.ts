import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { firestoreCollections } from 'consts';

const db = getFirestore();

const docRef = doc(db, 'config', firestoreCollections.currencies);

export const getCurrencies = async (): Promise<string[]> => {
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error('Currencies document not found');
  }

  const allowedCurrencies = snapshot.data()?.allowedCurrencies || [];

  if (!Array.isArray(allowedCurrencies)) {
    throw new Error('allowedCurrencies is not an array');
  }

  return allowedCurrencies as string[];
};
