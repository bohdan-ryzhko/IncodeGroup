import { FC, useCallback } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { styles } from './styles';
import { useHomeNavigationState } from 'navigations';

type Props = {
  visible: boolean;
  hideDialog: () => void;
};

export const UnselectedCurrencyAlert: FC<Props> = ({ visible, hideDialog }) => {
  const { setNavigationIndex } = useHomeNavigationState();

  const navigateToSettings = useCallback(() => {
    hideDialog();
    setTimeout(() => setNavigationIndex(1), 500);
  }, [hideDialog, setNavigationIndex]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Text variant="bodyLarge">
            In order to make expenses, you need to select currency in settings
          </Text>
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
          <Button
            contentStyle={styles.contetStyles}
            icon="arrow-right"
            onPress={navigateToSettings}>
            Go to settings
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
