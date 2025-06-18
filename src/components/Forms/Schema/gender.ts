import { z } from 'zod';

import { Gender } from '@custom-types/user';

export const genderSchema = z.nativeEnum(Gender);