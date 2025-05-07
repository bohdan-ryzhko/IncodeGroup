import React, { FC, PropsWithChildren } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
} from 'react-native';

import { styles } from './styles';

interface Props extends Required<PropsWithChildren> {}

export const FeedbackLayout: FC<Props> = ({ children }) => {
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
