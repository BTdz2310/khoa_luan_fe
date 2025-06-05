import z from 'zod';

export const notEmptySchema = (value = '') => z.string().min(1, { message: value })