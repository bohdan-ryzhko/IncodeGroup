import { PickerModal } from 'components';
import { FC, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import { useAppDispatch, useReduxStore } from 'hooks';
import { updateSettings } from 'store';
import { PreferredCurrency, Settings } from 'interfaces';
import { DELETE } from 'consts';

type Props = {
  options: string[];
};

export const CurrenciesSelect: FC<Props> = ({ options }) => {
  const { auth, settings } = useReduxStore();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const list = useMemo(() => [...options, DELETE], [options]);

  const userId = useMemo(() => auth.user?.uid, [auth.user?.uid]);

  const handleUpdateSettings = useCallback(
    (updatedSettings: Partial<Settings>) => {
      if (!userId) {
        return;
      }

      dispatch(updateSettings({ userId, settings: updatedSettings }));
    },
    [dispatch, userId],
  );

  const handleUpdateCurrency = useCallback(
    (preferredCurrency: string) => {
      handleUpdateSettings({
        preferredCurrency:
          preferredCurrency === DELETE
            ? null
            : (preferredCurrency as PreferredCurrency),
      });
    },
    [handleUpdateSettings],
  );

  return (
    <View style={styles.container}>
      <Button onPress={() => setVisible(true)} mode="contained-tonal">
        {settings.data?.preferredCurrency || 'Select Currency'}
      </Button>

      <PickerModal
        visible={visible}
        onClose={() => setVisible(false)}
        options={list}
        onConfirm={handleUpdateCurrency}
      />
    </View>
  );
};
