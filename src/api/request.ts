/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-await */
import TokenManager, { injectBearer } from 'brainless-token-manager';
import { extend } from 'umi-request';

import { getAccessToken, getRefreshToken, onLogout, setAccessToken, setRefreshToken } from '@utils/auth';
import { ENV } from 'src/utils/env';

import { API_PATH } from './constant';

const REQ_TIMEOUT = 25 * 1000;
export const isDev = ENV.NODE_ENV === 'development';

export const PREFIX_API = process.env.NEXT_PUBLIC_APP_API_URL;
export const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;

const createRequest = (withPrefix = true) => {
  return extend({
    prefix: withPrefix ? PREFIX_API : '',
    timeout: REQ_TIMEOUT,
    errorHandler: (error) => {
      throw error?.data || error?.response;
    }
  });
}

const request = createRequest();

const shouldLogout = async (response: any, options: any) => {
  const data = await response.clone().json()

  const token = getAccessToken()
  if (data?.status === 401 && !!token) {
    onLogout()
  }

  return response
}

request.interceptors.response.use(shouldLogout)

class NextTokenManager extends TokenManager {
  private _accessToken: any = null;
  private _refreshToken: any = null;
  private _shouldUpdate: boolean = false;

  setContext(accessToken: string | null, refreshToken: string | null) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
  }

  clear() {
    this._accessToken = null;
    this._refreshToken = null;
    this._shouldUpdate = false;
  }

  shouldUpdate() {
    // clear after request in server side
    const shouldUpdate = this._shouldUpdate;
    const accessToken = this._accessToken;
    const refreshToken = this._refreshToken;
    this.clear();
    return {
      shouldUpdate,
      accessToken,
      refreshToken
    }
  }

  constructor() {
    super({
      getAccessToken: async () => {
        const token = getAccessToken();
        return this._accessToken || ( token || '');
      },
      getRefreshToken: async () => {
        const refreshToken = getRefreshToken();
        return this._refreshToken || ( refreshToken || '');
      },
      executeRefreshToken: async () => {
        const refreshToken = await this.getRefreshToken();
        // const accessToken = await this.getAccessToken();

        // console.log('1', accessToken, refreshToken, '2')
        
        if (!refreshToken) {
          return {
            token: '',
            refresh_token: '',
          };
        }
    
        const r = await request.post(API_PATH.AUTH_REFRESH_TOKEN, {
          data: {
            refresh: refreshToken,
          }
        });
        // console.log(r)

        if (r.status < 200 || r.status >= 300) {
          if (typeof window === 'undefined') {
            this._shouldUpdate = true
            this._accessToken = null
            this._refreshToken = null
            return {
              token: '',
              refresh_token: ''
            }
          } else {
            onLogout()
          }
        }
    
        return {
          token: r.access,
          refresh_token: r.refresh,
        };
      },
    
      onRefreshTokenSuccess: ({ token, refresh_token: refreshToken }) => {
        if (token && refreshToken) {
          if (typeof window === 'undefined') {
            this._shouldUpdate = true;
            this._accessToken = token;
            this._refreshToken = refreshToken;
          } else {
            setAccessToken(token);
            setRefreshToken(refreshToken);
          }
        }
      },
      onInvalidRefreshToken: async () => {
        if (typeof window === 'undefined') {
          this._shouldUpdate = true
          this._accessToken = null
          this._refreshToken = null
          return {
            token: '',
            refresh_token: ''
          }
        } else {
          onLogout()
        }
      },
    });
  }
};

const tokenManager = new NextTokenManager();


export const prepareServerRequest = (accessToken: string | null, refreshToken: string | null) => {
  // setSSRContext(context);
  tokenManager.setContext(accessToken, refreshToken);
};

export const shouldUpdate = () => {
  return tokenManager.shouldUpdate()
}

type ApiResponse<T> = {
  data: T;
  message: string | null;
  error: string[] | null;
};

const privateRequest = async <T>(requestFn: typeof request, suffixUrl: string, configs?: any): Promise<ApiResponse<T>> => {
  const token: string = configs?.token ?? ((await tokenManager.getToken()) as string);

  const configRequest = token ? injectBearer(token, configs) : configs;

  const response = await requestFn(suffixUrl, configRequest);
  return response as unknown as ApiResponse<T>;
};

export { privateRequest, request };

