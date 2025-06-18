import { z } from 'zod';

import { genderSchema, notEmptySchema } from '@components/Forms/Schema';
import { dateSchema } from '@components/Forms/Schema/date';

export const profileFormSchema = z.object({
  fullName: notEmptySchema('Vui lòng nhập họ và tên của bạn'),
  birthDate: dateSchema('Ngày sinh'),
  gender: genderSchema,
  bio: z.string().nullish(),
  portrait_photo: z.instanceof(File).nullish(),
})

export type ProfileFormSchema = z.infer<typeof profileFormSchema>

const extendedSchema = z.object({
  interestings: z.array(z.number()).min(2),
});

export const createProfileFormSchema = profileFormSchema.merge(extendedSchema);
export type CreateProfileFormSchema = z.infer<typeof createProfileFormSchema>;