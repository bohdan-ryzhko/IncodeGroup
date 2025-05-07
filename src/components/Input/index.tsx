import { FC, useState } from 'react';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { FormikValues } from 'formik';

type PropsInput = {
  formik: FormikValues;
  name: string;
  isPassword?: boolean;
} & Omit<
  React.ComponentProps<typeof TextInput>,
  'value' | 'onChangeText' | 'onBlur'
>;

export const Input: FC<PropsInput> = ({
  formik,
  name,
  mode = 'outlined',
  isPassword = false,
  ...props
}) => {
  const [showPwd, setShowPwd] = useState(false);

  const errorMessage = formik.errors[name];
  const isError = errorMessage && Boolean(formik.touched[name]);

  return (
    <View>
      <TextInput
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        error={isError}
        right={
          isPassword && (
            <TextInput.Icon
              icon={showPwd ? 'eye-off' : 'eye'}
              onPress={() => setShowPwd(prev => !prev)}
            />
          )
        }
        secureTextEntry={isPassword && !showPwd}
        mode={mode}
        {...props}
      />

      {isError && <HelperText type="error">{errorMessage}</HelperText>}
    </View>
  );
};
