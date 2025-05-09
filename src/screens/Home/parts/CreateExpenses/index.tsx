import { FC, useCallback, useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from './styles';
import { CreatePayloadExpenses, InitialValuesCreateExpenses } from 'interfaces';
import { useAppDispatch, useReduxStore } from 'hooks';
import { createExpenses } from 'store';
import { FormikHelpers } from 'formik';
import { ExpensesModal } from '../ExpensesModal';
import { UnselectedCurrencyAlert } from '../UnselectedCurrencyAlert';

export const CreateExpenses: FC = () => {
  const { expenses, settings } = useReduxStore();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const showModal = useCallback(() => {
    if (settings.data?.preferredCurrency) {
      setVisible(true);
    } else {
      setVisibleAlert(true);
    }
  }, [settings.data?.preferredCurrency]);

  const hideModal = useCallback(() => setVisible(false), []);

  const submit = useCallback(
    async (
      payload: CreatePayloadExpenses,
      helpers: FormikHelpers<InitialValuesCreateExpenses>,
    ) => {
      const createdExpenses = await dispatch(createExpenses(payload)).unwrap();

      if (createdExpenses.id) {
        hideModal();
        helpers.resetForm();
      }
    },
    [dispatch, hideModal],
  );

  return (
    <View>
      <ExpensesModal
        visible={visible}
        loading={expenses.creating}
        hideModal={hideModal}
        submit={submit}
        buttonText="Create"
      />

      <UnselectedCurrencyAlert
        visible={visibleAlert}
        hideDialog={() => setVisibleAlert(false)}
      />

      <IconButton
        onPress={showModal}
        style={styles.button}
        mode="contained"
        icon="plus"
        size={35}
      />
    </View>
  );
};
