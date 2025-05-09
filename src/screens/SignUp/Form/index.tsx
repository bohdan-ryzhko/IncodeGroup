import { Container, Input } from 'components';
import { FormikHelpers, useFormik } from 'formik';
import { UserInfo } from 'interfaces';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Button } from 'react-native-paper';
import { signUp } from 'store';
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
      const createdUser = await dispatch(signUp(values)).unwrap();

      if (createdUser.email) {
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
    <Container>
      <View style={styles.container}>
        <Input
          formik={formik}
          name={'email'}
          label="Email"
          keyboardType="email-address"
        />
        <Input formik={formik} name={'password'} label="Password" isPassword />
        <Button
          loading={auth.creating}
          disabled={auth.creating}
          mode="contained"
          onPress={() => formik.handleSubmit()}>
          Sign Up
        </Button>
      </View>
    </Container>
  );
};
