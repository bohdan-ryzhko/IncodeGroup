import { FC, useState } from 'react';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import { Button } from 'react-native-paper';

function formatDateToYMD(dateInput: Date): string {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

type Props = {
  disabled?: boolean;
} & DatePickerProps;

export const PickerDate: FC<Props> = ({
  disabled = false,
  onConfirm,
  mode = 'date',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)} disabled={disabled} mode="text">
        {formatDateToYMD(props.date)}
      </Button>
      <DatePicker
        modal
        mode={mode}
        open={open}
        maximumDate={new Date()}
        onConfirm={changedDate => {
          setOpen(false);
          onConfirm?.(changedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        {...props}
      />
    </>
  );
};
