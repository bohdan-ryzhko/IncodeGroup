import { Input, PickerDate, PickerModal } from 'components';
import { FormikHelpers, useFormik } from 'formik';
import { useReduxStore } from 'hooks';
import {
  Categories,
  CreatePayloadExpenses,
  InitialValuesCreateExpenses,
} from 'interfaces';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';

import { getDisabled, removeKeys } from 'utils';

import { styles } from './styles';
import { validationSchema } from './validationSchema';
import { dequal } from 'dequal';

const initialValues: InitialValuesCreateExpenses = {
  amount: '',
  category: '',
  date: new Date().toString(),
  title: '',
};

type Props = {
  existValues?: InitialValuesCreateExpenses;
  submit: (
    payload: CreatePayloadExpenses,
    helpers: FormikHelpers<InitialValuesCreateExpenses>,
  ) => void;
  loading: boolean;
  buttonText: string;
};

export const ExpensesForm: FC<Props> = ({
  existValues,
  submit,
  loading,
  buttonText,
}) => {
  const { auth, categories } = useReduxStore();

  const [visible, setVisible] = useState(false);

  const userId = useMemo(() => auth.user?.uid, [auth.user?.uid]);

  const onSubmit = useCallback(
    async (
      values: InitialValuesCreateExpenses,
      helpers: FormikHelpers<InitialValuesCreateExpenses>,
    ) => {
      if (!userId) {
        return;
      }

      const payload: CreatePayloadExpenses = {
        ...values,
        category: values.category as Categories,
        userId,
        amount: Number(values.amount),
      };

      submit(payload, helpers);
    },
    [submit, userId],
  );

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      ...(existValues && existValues),
    },
    onSubmit,
    validationSchema: validationSchema(categories.data),
    enableReinitialize: true,
  });

  const disabled =
    loading ||
    getDisabled({
      values: formik.values,
      errors: removeKeys(formik.errors, 'category'),
    }) ||
    dequal(formik.values, existValues);

  return (
    <View style={styles.container}>
      <Input label="Title" formik={formik} name={'title'} />
      <Input label="Amount" formik={formik} name={'amount'} />

      <View>
        <Button onPress={() => setVisible(true)} disabled={loading} mode="text">
          {formik.values.category || 'Select Category'}
        </Button>

        {formik.errors.category &&
          formik.touched.category &&
          !formik.values.category && (
            <HelperText type={'error'}>{formik.errors.category}</HelperText>
          )}
      </View>

      <PickerModal
        visible={visible}
        onClose={() => {
          setVisible(false);
          formik.setFieldTouched('category', formik.values.category === '');
        }}
        options={categories.data}
        onConfirm={category => {
          formik.setFieldTouched('category', formik.values.category === '');
          formik.setFieldValue('category', category);
        }}
      />

      <PickerDate
        date={new Date(formik.values.date)}
        onConfirm={newDate => formik.setFieldValue('date', newDate.toString())}
      />

      <Button
        onPress={() => formik.handleSubmit()}
        loading={loading}
        disabled={disabled}
        mode="contained">
        {buttonText}
      </Button>
    </View>
  );
};
