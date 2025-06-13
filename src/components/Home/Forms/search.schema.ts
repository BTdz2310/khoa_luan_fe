import z from 'zod';

export const searchFormSchema = z.object({
  text: z.string().min(1),
})

export type SearchFormSchema = z.infer<typeof searchFormSchema>