import { FC, PropsWithChildren } from 'react';
import { SafeAreaView, StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './styles';

interface Props extends Required<PropsWithChildren> {
  component?: typeof View | typeof SafeAreaView;
  style?: StyleProp<ViewStyle>;
}

export const Container: FC<Props> = ({
  children,
  component: Component = View,
  style,
}) => {
  return <Component style={[styles.container, style]}>{children}</Component>;
};
