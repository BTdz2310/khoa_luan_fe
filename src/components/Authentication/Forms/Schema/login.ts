import z from 'zod';

import { notEmptySchema } from '@components/Forms/Schema';

export const loginFormSchema = z.object({
  username: notEmptySchema('Vui lòng nhập tên đăng nhập'),
  password: notEmptySchema('Vui lòng nhập mật khẩu'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;