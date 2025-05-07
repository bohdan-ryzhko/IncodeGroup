import { FC } from 'react';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';

type Props = {
  visible: boolean;
  hideDialog: () => void;
  onDelete: () => void;
};

export const DeletedDialog: FC<Props> = ({ visible, hideDialog, onDelete }) => {
  const theme = useTheme();

  const handleOnDelete = () => {
    onDelete();
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Text variant="bodyLarge">This action is irreversible. Delete?</Text>
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button textColor={theme.colors.error} onPress={handleOnDelete}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
