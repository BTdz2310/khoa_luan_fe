import { useRequest } from 'ahooks';
import { deleteCookie } from 'cookies-next';
import { atom, useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { Auth } from '@custom-types/user';
import { profileService } from '@services/account';
import { LoginResponsePayload } from '@services/auth.type';
import { ROUTE_PATH } from '@shared-constants/route-path';
import { setAccessToken, setRefreshToken } from '@utils/auth';

export const profileAtom = atom<Auth | null>(null)

export const useAuth = () => {
  const [profile, setProfile] = useAtom(profileAtom)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || ROUTE_PATH.HOME

  const router = useRouter()
  const onLogin = (data: LoginResponsePayload) => {
    try {
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      setProfile(data.auth)
      // router.push(ROUTE_PATH.MEMORY);
      router.push(redirect)
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const logout = () => {
    const access = process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'LEARNIVERSE_ACCESS_TOKEN'
    const refresh = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'LEARNIVERSE_REFRESH_TOKEN'
    deleteCookie(access)
    deleteCookie(refresh)
    router.push(ROUTE_PATH.LOGIN)
  }

  const { run: getProfile } = useRequest(profileService, {
    manual: true,
    onSuccess: (data) => {
      setProfile(data.data)
    }
  })

  return {
    onLogin,
    profile,
    setProfile,
    logout,
    getProfile
  }
}