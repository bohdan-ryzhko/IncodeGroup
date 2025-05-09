import React, { FC, PropsWithChildren, useMemo } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
} from 'react-native';

import { s } from './styles';
import { useTheme } from 'react-native-paper';

interface Props extends Required<PropsWithChildren> {}

export const FeedbackLayout: FC<Props> = ({ children }) => {
  const theme = useTheme();

  const styles = useMemo(() => s(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
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
