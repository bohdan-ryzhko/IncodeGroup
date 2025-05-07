import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';
import { firestoreCollections } from 'consts';
import {
  CreatePayloadExpenses,
  Expenses,
  UpdatePayloadExpenses,
} from 'interfaces';
import { ThunkWrapper } from 'store/helpers';

const db = getFirestore();

const expensesCollection = collection(db, firestoreCollections.expenses);

export const createExpenses = ThunkWrapper<Expenses, CreatePayloadExpenses>(
  'create/expenses',
  async data => {
    const docRef = await addDoc(expensesCollection, data);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error('Expenses not found');
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Expenses;
  },
);

export const getExpenses = ThunkWrapper<Expenses[], string>(
  'get/expenses',
  async userId => {
    const q = query(expensesCollection, where('userId', '==', userId));

    const snapshot = await getDocs(q);

    const expenses = snapshot.docs.map(document => ({
      id: document.id,
      ...(document.data() as CreatePayloadExpenses),
    }));

    return [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },
);

export const updateExpenses = ThunkWrapper<Expenses, UpdatePayloadExpenses>(
  'update/expenses',
  async ({ id, ...updatePayload }) => {
    const ref = doc(db, firestoreCollections.expenses, id);

    await updateDoc(ref, updatePayload);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      throw new Error(`Expense with id "${id}" not found`);
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Expenses;
  },
);

export const deleteExpenses = ThunkWrapper<string, string>(
  'delete/expenses',
  async id => {
    const ref = doc(db, firestoreCollections.expenses, id);

    await deleteDoc(ref);

    return id;
  },
);
