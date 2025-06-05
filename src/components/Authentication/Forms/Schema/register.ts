import z from 'zod';

import { emailSchema, notEmptySchema, registerPasswordSchema, registerUsernameSchema } from '@components/Forms/Schema';

export const registerFormSchema = z.object({
  username: registerUsernameSchema,
  password: registerPasswordSchema,
  email: emailSchema,
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

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;