import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { firestoreCollections } from 'consts';
import { Expenses } from 'interfaces';

const db = getFirestore();

export const getExpensesById = async (id: string) => {
  const ref = doc(db, firestoreCollections.expenses, id);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error(`Expense with id "${id}" not found`);
  }

  return snapshot.data() as Expenses;
};
