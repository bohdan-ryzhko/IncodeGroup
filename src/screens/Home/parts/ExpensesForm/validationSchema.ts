import * as Yup from 'yup';
import { digitsRegex } from 'consts';

export const validationSchema = (categories: string[]) => {
  return Yup.object().shape({
    title: Yup.string().required(),
    date: Yup.string().required(),
    amount: Yup.string()
      .matches(digitsRegex, 'Amount must contain only numbers')
      .required(),
    category: Yup.string().oneOf(categories, 'Invalid category').required(),
  });
};
