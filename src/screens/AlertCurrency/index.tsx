import { useNavigation } from '@react-navigation/native';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from './styles';
import { Container } from 'components';
import { useHomeNavigationState } from 'navigations';

export const AlertCurrency: FC = () => {
  const navigation = useNavigation();
  const { setNavigationIndex } = useHomeNavigationState();

  const handleNavigateToSettongs = useCallback(() => {
    navigation.goBack();

    setTimeout(() => setNavigationIndex(1), 800);
  }, [navigation, setNavigationIndex]);

  return (
    <Container>
      <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.text}>
          In order to be able to keep track of expenses, you need to select a
          currency
        </Text>
        <Button onPress={handleNavigateToSettongs}>Go to settings!</Button>
      </View>
    </Container>
  );
};
