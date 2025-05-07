import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { firestoreCollections } from 'consts';
import { ThunkWrapper } from 'store/helpers';

const db = getFirestore();

export const getCategories = ThunkWrapper('get/categories', async () => {
  const docRef = doc(db, 'config', firestoreCollections.categories);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error('Categories document not found');
  }

  const allowedCategories = snapshot.data()?.allowedCategories || [];

  if (!Array.isArray(allowedCategories)) {
    throw new Error('allowedCategories is not an array');
  }

  return allowedCategories;
});
