import * as yup from 'yup';

export const billValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  due_date: yup.date().required(),
  user_id: yup.string().nullable(),
  bank_id: yup.string().nullable(),
});
