import { FC } from 'react';
import { useUser } from 'hooks';
import { AuthNavigation, HomeNavigation } from 'navigations';

export const Main: FC = () => {
  const user = useUser();

  return user ? <HomeNavigation /> : <AuthNavigation />;
};
