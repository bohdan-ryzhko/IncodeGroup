import React, { FC, useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { useTheme } from 'react-native-paper';

import { s } from './styles';

type Props = {
  visible: boolean;
  onClose: (value: string) => void;
  options: string[];
  onConfirm: (value: string) => void;
} & PickerProps<string>;

export const PickerModal: FC<Props> = ({
  visible,
  onClose,
  options,
  onConfirm,
  ...props
}) => {
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
