import { FC, useMemo } from 'react';
import { Modal, Portal, useTheme } from 'react-native-paper';
import { ExpensesForm } from '../ExpensesForm';
import { s } from './styles';
import { CreatePayloadExpenses, InitialValuesCreateExpenses } from 'interfaces';
import { FormikHelpers } from 'formik';

type Props = {
  visible: boolean;
  loading: boolean;
  hideModal: () => void;
  existValues?: InitialValuesCreateExpenses;
  submit: (
    payload: CreatePayloadExpenses,
    helpers: FormikHelpers<InitialValuesCreateExpenses>,
  ) => void;
  buttonText: string;
};

export const ExpensesModal: FC<Props> = ({
  visible,
  hideModal,
  submit,
  loading,
  existValues,
  buttonText,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => s(theme), [theme]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalBody}>
        <ExpensesForm
          existValues={existValues}
          submit={submit}
          loading={loading}
          buttonText={buttonText}
        />
      </Modal>
    </Portal>
  );
};
