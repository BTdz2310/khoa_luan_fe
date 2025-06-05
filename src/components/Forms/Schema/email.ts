import z from 'zod';

export const emailSchema = z.string().min(1, { message: 'Vui lòng nhập email.' }).trim().email('Đây không phải email hợp lệ.')