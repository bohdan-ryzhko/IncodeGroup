import { Container, LoadingScreen } from 'components';
import { FC, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { CurrenciesSelect } from './parts';
import { useMutation, useReduxStore } from 'hooks';
import { getCurrencies } from 'services';

export const CurrencyScreen: FC = () => {
  const { settings } = useReduxStore();
  const { data, error, isLoading, mutation } = useMutation<string[]>({
    mutationFn: getCurrencies,
  });

  useEffect(() => {
    mutation();
  }, [mutation]);

  if (isLoading || settings.updating) {
    return <LoadingScreen />;
  }

  return (
    <Container component={SafeAreaView}>
      {data && !isLoading && !error && <CurrenciesSelect options={data} />}
    </Container>
  );
};
