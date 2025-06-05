import z from 'zod';

import { passwordRegex } from 'src/regex';

export const registerPasswordSchema = z.string().min(8, { message: 'Mật khẩu phải có tối thiểu 8 ký tự bao gồm: chữ thường, chữ in hoa, số và ký tự đặc biệt' }).regex(passwordRegex, 'Mật khẩu phải có tối thiểu 8 ký tự bao gồm: chữ thường, chữ in hoa, số và ký tự đặc biệt');