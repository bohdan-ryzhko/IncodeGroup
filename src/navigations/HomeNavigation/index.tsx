import { LoadingScreen } from 'components';
import { routes, Routes } from 'consts';
import { useInitializeSettings, useReduxStore } from 'hooks';
import { FC, ReactNode, useState } from 'react';
import { BottomNavigation, Icon, Provider } from 'react-native-paper';

import { HomeScreen, SettingsScreen } from 'screens';
import { HomeContext } from './HomeContext';

export * from './HomeContext';

type HomeRoutes = Extract<Routes, 'home' | 'settings'>;

const SceensMap: Record<HomeRoutes, ReactNode> = {
  home: <HomeScreen />,
  settings: <SettingsScreen />,
};

export const HomeNavigation: FC = () => {
  const [index, setIndex] = useState(0);
  const { settings } = useReduxStore();

  useInitializeSettings();

  const navigationRoutes = [
    { key: routes.home, title: 'Home', icon: 'home' },
    { key: routes.settings, title: 'Settings', icon: 'cog' },
  ];

  const renderScene = ({ route }: { route: { key: HomeRoutes } }) =>
    SceensMap[route.key];

  if (settings.loading) {
    return <LoadingScreen />;
  }

  return (
    <HomeContext.Provider
      value={{ navigationIndex: index, setNavigationIndex: setIndex }}>
      <Provider>
        {renderScene({ route: navigationRoutes[index] })}
        <BottomNavigation.Bar
          navigationState={{ index, routes: navigationRoutes }}
          onTabPress={({ route }) => {
            const newIndex = navigationRoutes.findIndex(
              r => r.key === route.key,
            );
            if (newIndex !== -1) {
              setIndex(newIndex);
            }
          }}
          renderIcon={({ route, color }) => (
            <Icon source={route.icon} size={24} color={color} />
          )}
          getLabelText={({ route }) => route.title}
        />
      </Provider>
    </HomeContext.Provider>
  );
};
