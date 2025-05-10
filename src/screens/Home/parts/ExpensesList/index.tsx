import { useAppDispatch, useHomeNavigation, useReduxStore } from 'hooks';
import {
  CreatePayloadExpenses,
  Expenses,
  InitialValuesCreateExpenses,
} from 'interfaces';
import { FormikHelpers } from 'formik';
import { FC, useCallback, useMemo, useState } from 'react';
import { ListRenderItemInfo, TouchableHighlight, View } from 'react-native';
import { Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { updateExpenses } from 'store';

import { DeletedDialog } from './DeletedDialog';

import { findExpensesById, removeKeys, truncate } from 'utils';
import { ExpensesModal } from '../ExpensesModal';
import { routes } from 'consts';

import { s } from './styles';

type Props = {
  computedExpenses: Expenses[];
};

export const ExpensesList: FC<Props> = ({ computedExpenses }) => {
  const { expenses } = useReduxStore();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useHomeNavigation();

  const styles = useMemo(() => s(theme), [theme]);

  const [deletedId, setDeletedId] = useState('');
  const [updatedId, setUpdatedId] = useState('');

  const hideDeletedDialog = () => setDeletedId('');
  const hideUpdateModal = () => setUpdatedId('');

  const list = useMemo(
    () =>
      computedExpenses.map(item => ({
        key: item.id,
        ...item,
      })),
    [computedExpenses],
  );

  const findExpenses = useCallback(
    (id: string) => findExpensesById(expenses.data, id),
    [expenses.data],
  );

  const foundDeletedExpensesById = findExpenses(deletedId);

  const foundUpdatedExpensesById = findExpenses(updatedId);

  const existValues: InitialValuesCreateExpenses = useMemo(() => {
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

      if (updatedExpenses?.id) {
        hideUpdateModal();
        helpers.resetForm();
      }
    },
    [dispatch, foundUpdatedExpensesById, updatedId],
  );

  const navigateToExpensesDetails = useCallback(
    (id: string) => {
      navigation.navigate(routes.expensesDetails, { id });
    },
    [navigation],
  );

  const renderItem = (data: ListRenderItemInfo<Expenses>) => (
    <TouchableHighlight
      onPress={() => navigateToExpensesDetails(data.item.id)}
      style={[
        styles.rowFront,
        data.index === 0 && styles.topItem,
        data.index === list.length - 1 && styles.bottomItem,
      ]}
      underlayColor={theme.colors.onSecondary}>
      <View style={styles.item}>
        <Text>{data.item.title}</Text>
        <Chip style={styles.category}>{truncate(data.item.category, 5)}</Chip>
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
        foundExpenses={foundDeletedExpensesById}
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
