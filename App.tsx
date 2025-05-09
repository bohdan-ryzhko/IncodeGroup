import React, { useMemo } from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import { CombinedDarkTheme, CombinedDefaultTheme } from 'theme';

import { Main } from 'main';

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();

  const theme = useMemo(
    () => (colorScheme === 'light' ? CombinedDefaultTheme : CombinedDarkTheme),
    [colorScheme],
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
