import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  transaction_type: yup.string().required(),
  user_id: yup.string().nullable(),
  bank_id: yup.string().nullable(),
});
