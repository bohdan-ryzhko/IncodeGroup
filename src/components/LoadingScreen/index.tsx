import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './stykes';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" animating />
    </SafeAreaView>
  );
};
