import z from 'zod';

import { notEmptySchema, registerPasswordSchema } from '@components/Forms/Schema';

export const forgetResetFormSchema = z.object({
  password: registerPasswordSchema,
  confirm_password: notEmptySchema('Vui lòng xác nhận mật khẩu'),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Xác nhận mật khẩu không chính xác',
      path: ['confirm_password']
    });
  }
});

export type ForgetResetFormSchema = z.infer<typeof forgetResetFormSchema>;