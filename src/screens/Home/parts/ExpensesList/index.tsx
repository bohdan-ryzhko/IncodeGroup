import { useAppDispatch, useReduxStore } from 'hooks';
import {
  CreatePayloadExpenses,
  Expenses,
  InitialValuesCreateExpenses,
} from 'interfaces';
import { FC, useCallback, useMemo, useState } from 'react';
import { ListRenderItemInfo, TouchableHighlight, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteExpenses, updateExpenses } from 'store';

import { DeletedDialog } from './DeletedDialog';

import { s } from './styles';
import { findExpensesById, removeKeys } from 'utils';
import { ExpensesModal } from '../ExpensesModal';
import { FormikHelpers } from 'formik';

export const sss: InitialValuesCreateExpenses = {
  amount: '',
  category: '',
  date: '',
  title: '',
};

export const ExpensesList: FC = () => {
  const { expenses } = useReduxStore();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const styles = useMemo(() => s(theme), [theme]);

  const [deletedId, setDeletedId] = useState('');
  const [updatedId, setUpdatedId] = useState('');

  const hideDeletedDialog = () => setDeletedId('');
  const hideUpdateModal = () => setUpdatedId('');

  const findExpenses = useCallback(
    (id: string) => findExpensesById(expenses.data, id),
    [expenses.data],
  );

  const foundUpdatedExpensesById = findExpenses(updatedId);

  const existValues = useMemo(() => {
    if (!foundUpdatedExpensesById) {
      return {
        amount: '',
        category: '',
        date: '',
        title: '',
      };
    }

    return removeKeys(
      {
        ...foundUpdatedExpensesById,
        amount: `${foundUpdatedExpensesById.amount}`,
      },
      ['userId', 'id'],
    );
  }, [foundUpdatedExpensesById]);

  const handleDeleteExpenses = useCallback(() => {
    if (!deletedId) {
      return;
    }

    const foundExpensesById = findExpenses(deletedId);

    if (foundExpensesById) {
      dispatch(deleteExpenses(deletedId));
    }
  }, [deletedId, dispatch, findExpenses]);

  const handleUpdateExpenses = useCallback(
    async (
      payload: CreatePayloadExpenses,
      helpers: FormikHelpers<InitialValuesCreateExpenses>,
    ) => {
      if (!(updatedId && foundUpdatedExpensesById)) {
        return;
      }

      const updatedExpenses = await dispatch(
        updateExpenses({ id: updatedId, ...payload }),
      ).unwrap();

      if (updatedExpenses.id) {
        hideUpdateModal();
        helpers.resetForm();
      }
    },
    [dispatch, foundUpdatedExpensesById, updatedId],
  );

  const list = useMemo(
    () =>
      expenses.data.map(item => ({
        key: item.id,
        ...item,
      })),
    [expenses.data],
  );

  const renderItem = (data: ListRenderItemInfo<Expenses>) => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#AAA'}>
      <View>
        <Text>{data.item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data: ListRenderItemInfo<Expenses>) => {
    return (
      <View style={styles.rowBack}>
        <IconButton
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          icon="database-edit-outline"
          onPress={() => setUpdatedId(data.item.id)}
        />
        <IconButton
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          icon="trash-can-outline"
          onPress={() => setDeletedId(data.item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe
        leftOpenValue={0}
        rightOpenValue={-100}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />

      <DeletedDialog
        visible={Boolean(deletedId)}
        hideDialog={hideDeletedDialog}
        onDelete={handleDeleteExpenses}
      />

      {foundUpdatedExpensesById && (
        <ExpensesModal
          visible={Boolean(updatedId)}
          loading={expenses.updating}
          hideModal={hideUpdateModal}
          submit={handleUpdateExpenses}
          existValues={existValues}
          buttonText="Update"
        />
      )}
    </View>
  );
};
