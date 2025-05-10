import React, { FC, PropsWithChildren, useMemo } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { s } from './styles';

interface Props extends Required<PropsWithChildren> {
  containerStyle?: StyleProp<ViewStyle>;
}

export const FeedbackLayout: FC<Props> = ({ children, containerStyle }) => {
  const theme = useTheme();

  const styles = useMemo(() => s(theme), [theme]);

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerWrapper}>
          <KeyboardAvoidingView
            style={styles.innerWrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
