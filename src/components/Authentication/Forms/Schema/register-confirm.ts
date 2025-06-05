import z from 'zod';

export const registerConfirmSchema = z.object({
  verification_code: z.string().length(6, { message: '' }),
});

export type RegisterConfirmSchema = z.infer<typeof registerConfirmSchema>