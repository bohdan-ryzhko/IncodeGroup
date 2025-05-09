import { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';

export const EmptyView: FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">List is empty</Text>
    </View>
  );
};
