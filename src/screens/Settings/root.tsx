import { FC, useMemo } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LogoutButton, SettingsNavList } from './parts';
import { Container } from 'components';
import { s } from './styles';

export const SettingsRoot: FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => s(theme), [theme]);

  return (
    <Container component={SafeAreaView}>
      <View style={styles.container}>
        <SettingsNavList />

        <View style={styles.buttonWrapper}>
          <LogoutButton />
        </View>
      </View>
    </Container>
  );
};
