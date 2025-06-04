import z from 'zod';

export const passwordSchema = z.string().min(1, 'Vui lòng nhập mật khẩu');
export const registerPasswordSchema = z.string().min(8, 'Vui lí nhập mật khất');