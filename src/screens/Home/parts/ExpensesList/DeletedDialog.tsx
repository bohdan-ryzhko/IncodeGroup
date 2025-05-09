import { useAppDispatch, useReduxStore } from 'hooks';
import { Expenses } from 'interfaces';
import { FC, useCallback } from 'react';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { deleteExpenses } from 'store';

type Props = {
  visible: boolean;
  hideDialog: () => void;
  foundExpenses: Expenses | undefined;
};

export const DeletedDialog: FC<Props> = ({
  visible,
  hideDialog,
  foundExpenses,
}) => {
  const { expenses } = useReduxStore();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleDeleteExpenses = useCallback(async () => {
    if (!foundExpenses?.id) {
      return;
    }

    try {
      await dispatch(deleteExpenses(foundExpenses.id));
      hideDialog();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, foundExpenses, hideDialog]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Text variant="bodyLarge">This action is irreversible. Delete?</Text>
        </Dialog.Title>
        <Dialog.Actions>
          <Button disabled={expenses.deleting} onPress={hideDialog}>
            Cancel
          </Button>
          <Button
            disabled={expenses.deleting}
            loading={expenses.deleting}
            textColor={theme.colors.error}
            onPress={handleDeleteExpenses}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
