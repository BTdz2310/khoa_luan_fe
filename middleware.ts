import CryptoJS from 'crypto-js';
import { NextRequest, NextResponse } from 'next/server';

import { Remember, RememberType } from '@custom-types/otp';
import { ROUTE_PATH } from '@shared-constants/route-path';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY

const verifyCode = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY || '');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// Check auth from server side here
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'LEARNIVERSE_ACCESS_TOKEN');
  const authRoutes = [ROUTE_PATH.LOGIN, ROUTE_PATH.REGISTER, ROUTE_PATH.REGISTER_CONFIRM, ROUTE_PATH.FORGET, ROUTE_PATH.FORGET_CONFIRM, ROUTE_PATH.FORGET_RESET, '/404']
  const protectedRoutes: string[] = []

  if (authRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL(ROUTE_PATH.HOME, request.url))
  }

  if ((protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !request.nextUrl.pathname.startsWith(`${ROUTE_PATH.HOME}/`)) && !token) {
    const redirectUrl = new URL(ROUTE_PATH.LOGIN, request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  // Remember Register
  if (request.nextUrl.pathname.startsWith(ROUTE_PATH.REGISTER) && !request.nextUrl.pathname.startsWith(ROUTE_PATH.REGISTER_CONFIRM)) {
    const response = NextResponse.next();
    try {
      const encryptedData = request.cookies.get('otp_data')?.value;
      if (encryptedData) {
        const decryptedData = verifyCode(encryptedData) as Remember;
        if (
          decryptedData.type === RememberType.Register &&
          decryptedData.hash_code &&
          decryptedData.email &&
          decryptedData.user_id
        ) {
          const decryptedString = encodeURIComponent(JSON.stringify(decryptedData));
          response.headers.set('x-verify-otp', decryptedString);
        }
      }
    } catch {}
    return response;
  }

  // OTP
  if (request.nextUrl.pathname.startsWith(ROUTE_PATH.REGISTER_CONFIRM)) {
    try {
      const encryptedData = request.cookies.get('otp_data')?.value;
      const decryptedData = verifyCode(encryptedData || '') as Remember;
      if ((decryptedData.type !== RememberType.Register) || !decryptedData.hash_code || !decryptedData.email || !decryptedData.user_id) {
        return NextResponse.redirect(new URL(ROUTE_PATH.REGISTER, request.url));
      }
      const decryptedString = encodeURIComponent(JSON.stringify(decryptedData))

      const response = NextResponse.next();
      response.headers.set('x-verify-otp', decryptedString);
      return response;
    } catch {
      url.pathname = ROUTE_PATH.REGISTER;
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith(ROUTE_PATH.FORGET_CONFIRM)) {
    try {
      const encryptedData = request.cookies.get('otp_data')?.value;
      const decryptedData = verifyCode(encryptedData || '') as Remember;
      if ((decryptedData.type !== RememberType.Forget) || !decryptedData.hash_code || !decryptedData.email || !decryptedData.user_id) {
        return NextResponse.redirect(new URL(ROUTE_PATH.FORGET, request.url));
      }
      const decryptedString = encodeURIComponent(JSON.stringify(decryptedData))

      const response = NextResponse.next();
      response.headers.set('x-verify-otp', decryptedString);
      return response;
    } catch {
      return NextResponse.redirect(new URL(ROUTE_PATH.FORGET, request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith(ROUTE_PATH.FORGET_RESET)) {
    try {
      const encryptedData = request.cookies.get('otp_data')?.value;
      const decryptedData = verifyCode(encryptedData || '') as Remember;
      if ((decryptedData.type !== RememberType.Forget) || !decryptedData.hash_code || !decryptedData.email || !decryptedData.user_id || !decryptedData.verification_code) {
        return NextResponse.redirect(new URL(ROUTE_PATH.FORGET, request.url));
      }
      const decryptedString = encodeURIComponent(JSON.stringify(decryptedData))

      const response = NextResponse.next();
      response.headers.set('x-verify-otp', decryptedString);
      return response;
    } catch {
      return NextResponse.redirect(new URL(ROUTE_PATH.FORGET, request.url));
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|static|_next/static|_next/images|svgIcon|svg|logo|lottie|styles-antd|locales|/_next/data|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)',
    '/',
  ],
};
