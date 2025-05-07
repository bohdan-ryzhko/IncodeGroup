import React from 'react';
import { AuthNavigation, HomeNavigation } from 'navigations';
import { useUser } from 'hooks';

function App(): React.JSX.Element {
  const user = useUser();

  return user ? <HomeNavigation /> : <AuthNavigation />;
}

export default App;
