import { useAppDispatch, useReduxStore } from 'hooks';
import { useCallback, useEffect, useMemo } from 'react';
import { getAllSettings, initializeSettings } from 'store';

export const useInitializeSettings = () => {
  const { auth, settings } = useReduxStore();

  const dispatch = useAppDispatch();

  const userId = useMemo(() => auth.user?.uid, [auth.user?.uid]);

  const handleSetupSettings = useCallback(
    async (id: string) => {
      if (settings.data) {
        return;
      }

      try {
        await dispatch(getAllSettings(id)).unwrap();
      } catch (error: any) {
        if (error.message === 'Settings not found') {
          await dispatch(initializeSettings(id));
        } else {
          console.error('Ошибка при получении настроек:', error);
        }
      }
    },
    [dispatch, settings.data],
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    handleSetupSettings(userId);
  }, [handleSetupSettings, userId]);
};
