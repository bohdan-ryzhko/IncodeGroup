import * as Yup from 'yup';
import { emailRegex } from 'consts';

export const validationSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex, 'Eneter a valid email').required(),
  password: Yup.string().min(6).required(),
});
