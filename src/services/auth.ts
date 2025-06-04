import { setCookie, getCookie, deleteCookie } from 'cookies-next';

import { ROUTE_PATH } from '@shared-constants/route-path';

export const getAccessToken = () => {
  return getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'LEARNIVERSE_ACCESS_TOKEN');
};

export const getRefreshToken = () => {
  return getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'LEARNIVERSE_REFRESH_TOKEN');
};

export const setAccessToken = (token: string) => {
  setCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'LEARNIVERSE_ACCESS_TOKEN', token);
};

export const setRefreshToken = (token: string) => {
  setCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'LEARNIVERSE_REFRESH_TOKEN', token);
};

export const onLogout = () => {
  if (typeof window !== 'undefined') {
    deleteCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'LEARNIVERSE_ACCESS_TOKEN')
    deleteCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'LEARNIVERSE_REFRESH_TOKEN')
    window.location.href = ROUTE_PATH.LOGIN;
  }
}