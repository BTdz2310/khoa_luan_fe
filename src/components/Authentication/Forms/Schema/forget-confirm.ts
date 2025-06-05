import z from 'zod';

export const forgetConfirmSchema = z.object({
  verification_code: z.string().length(6, { message: '' }),
});

export type ForgetConfirmSchema = z.infer<typeof forgetConfirmSchema>