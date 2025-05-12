import React, { FC, PropsWithChildren, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';

import { styles } from './styles';

type Props = {
  colors?: (string | number)[];
  component?: typeof View | typeof SafeAreaView;
} & Required<PropsWithChildren> &
  Omit<LinearGradientProps, 'colors'>;

export const GradientBackground: FC<Props> = ({
  children,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  component: Component = SafeAreaView,
  ...props
}) => {
  const theme = useTheme();

  const computedColors = useMemo(
    () =>
      props.colors || [theme.colors.inverseOnSurface, theme.colors.background],
    [props.colors, theme.colors.background, theme.colors.inverseOnSurface],
  );

  return (
    <Component style={styles.container}>
      <LinearGradient
        colors={computedColors}
        start={start}
        end={end}
        style={StyleSheet.absoluteFillObject}
        {...props}
      />
      {children}
    </Component>
  );
};
