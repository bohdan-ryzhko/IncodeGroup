import React, { useMemo, useState } from 'react';
import { Modal, View, Button, TouchableWithoutFeedback } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { Text, useTheme } from 'react-native-paper';

import { s } from './styles';

type Props<T extends string> = {
  visible: boolean;
  onClose: (value: T) => void;
  options: T[];
  onConfirm: (value: T) => void;
} & PickerProps<T>;

export const PickerModal = <T extends string>({
  visible,
  onClose,
  options,
  onConfirm,
  ...props
}: Props<T>) => {
  const [value, setValue] = useState(options[0]);
  const theme = useTheme();

  const styles = useMemo(() => s(theme), [theme]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={() => onClose(value)}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.label}>Select value</Text>
              <Picker onValueChange={setValue} selectedValue={value} {...props}>
                {options.map(option => (
                  <Picker.Item label={option} value={option} key={option} />
                ))}
              </Picker>
              <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={() => onClose(value)} />
                <Button
                  title="Confirm"
                  onPress={() => {
                    onConfirm(value);
                    onClose(value);
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
