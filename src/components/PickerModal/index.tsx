import React, { FC, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';

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

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
