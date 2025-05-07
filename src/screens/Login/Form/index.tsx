import { FormikHelpers, useFormik } from 'formik';
import { UserInfo } from 'interfaces';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Button } from 'react-native-paper';
import { login } from 'store';
import { Input } from 'components';
import { useAppDispatch, useReduxStore } from 'hooks';

import { validationSchema } from './validationSchema';

const initialValues: UserInfo = {
  email: '',
  password: '',
};

export const Form: FC = () => {
  const { auth } = useReduxStore();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (values: UserInfo, { resetForm }: FormikHelpers<UserInfo>) => {
      const user = await dispatch(login(values)).unwrap();

      if (user.email) {
        resetForm();
      }
    },
    [dispatch],
  );

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <Input
        formik={formik}
        name={'email'}
        label="Email"
        keyboardType="email-address"
      />
      <Input formik={formik} name={'password'} label="Password" isPassword />
      <Button
        loading={auth.loggingIn}
        disabled={auth.loggingIn}
        mode="contained"
        onPress={() => formik.handleSubmit()}>
        Login
      </Button>
    </View>
  );
};
