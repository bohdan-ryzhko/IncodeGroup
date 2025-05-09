import { useRoute } from '@react-navigation/native';
import { Container, LoadingScreen } from 'components';
import { useMutation } from 'hooks';
import { Expenses } from 'interfaces';
import { FC, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { getExpensesById } from 'services';
import { styles } from './styles';
import { formatDate } from 'utils';

export const ExpensesDetails: FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const { data, isLoading, error, mutation } = useMutation<Expenses, string>({
    mutationFn: getExpensesById,
  });

  const fetchData = useCallback(() => {
    if (!id) {
      return;
    }

    mutation(id);
  }, [id, mutation]);

  useEffect(fetchData, [fetchData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container style={styles.container}>
      {!isLoading && data && !error && (
        <View>
          <Card>
            <Card.Content>
              <View style={styles.titleWrapper}>
                <Text variant="titleLarge">{data.title}</Text>
                <Text variant="bodyMedium">{data.category}</Text>
              </View>
              <Text variant="bodyMedium">Amount: {data.amount}</Text>
              <Text variant="bodyMedium">
                Date: {formatDate(new Date(data.date))}
              </Text>
            </Card.Content>
          </Card>
        </View>
      )}

      {!isLoading && error ? (
        <Button onPress={fetchData}>Try againg</Button>
      ) : (
        <></>
      )}
    </Container>
  );
};
