import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type HomeContextType = {
  navigationIndex: number;
  setNavigationIndex: Dispatch<SetStateAction<number>>;
};

export const HomeContext = createContext<HomeContextType>({
  navigationIndex: 0,
  setNavigationIndex: () => {},
});

export const useHomeNavigationState = () => useContext(HomeContext);
