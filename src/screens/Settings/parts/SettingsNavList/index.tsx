import React, { FC, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { settingsList } from '../settingsList';
import { s } from './styles';

export const SettingsNavList: FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  console.log('theme', theme);

  const styles = useMemo(() => s(theme), [theme]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={settingsList}
        renderItem={({ item }) => (
          <Button
            icon={item.icon}
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => navigation.navigate(item.navigateTo)}>
            {item.label}
          </Button>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
