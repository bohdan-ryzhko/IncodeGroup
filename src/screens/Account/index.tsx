import { FC, useMemo } from 'react';
import { Container } from 'components';
import { styles } from './styles';
import { Avatar, Card } from 'react-native-paper';
import { useReduxStore } from 'hooks';
import { LogoutButton } from 'screens/Settings/parts';
import { View } from 'react-native';

const getAvatar = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="account" />
);

export const AccountScreen: FC = () => {
  const { auth } = useReduxStore();

  const user = useMemo(() => auth.user, [auth.user]);

  return (
    <View style={styles.wrapper}>
      <Container style={styles.container}>
        <Card>
          <Card.Title
            title="User info"
            subtitle={user?.email}
            left={getAvatar}
          />
        </Card>
      </Container>
      <View style={styles.buttonWrapper}>
        <LogoutButton />
      </View>
    </View>
  );
};
