import { setCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';

import { Remember } from '@custom-types/otp';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY
const ttl = 10 * 60 * 1000

export const setCookieOtp = (otpData: Remember) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(otpData), SECRET_KEY || '').toString();
  setCookie('otp_data', encryptedData, {
    expires: new Date(Date.now() + ttl),
  })
}