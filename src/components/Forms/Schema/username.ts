import { z } from 'zod';

import { usernameRegex } from 'src/regex';

export const registerUsernameSchema = z.string().min(1, { message: 'Vui lòng nhập tên đăng nhập' }).regex(usernameRegex, 'Tên đăng nhập không hợp lệ.').max(50, 'Tên đăng nhập chứa tối đa 50 ký tự')