import z from 'zod';

import { isValidDate } from '@utils/common';
import { dateRegex } from 'src/regex';

export const dateSchema = (type: string) => z.string().regex(dateRegex, `${type} không đúng định dạng`).refine(date => !date || (date && isValidDate(date)), `${type} không hợp lệ`)