import z from 'zod';

import { emailSchema } from '@components/Forms/Schema';

export const forgetFormSchema = z.object({
  email: emailSchema,
});

export type ForgetFormSchema = z.infer<typeof forgetFormSchema>;