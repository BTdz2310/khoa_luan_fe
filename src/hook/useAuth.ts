import { atom, useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { Profile } from '@custom-types/user';
import { LoginResponsePayload } from '@services/auth.type';
import { ROUTE_PATH } from '@shared-constants/route-path';
import { setAccessToken, setRefreshToken } from '@utils/auth';

export const profileAtom = atom<Profile | null>(null)

export const useAuth = () => {
  const [profile, setProfile] = useAtom(profileAtom)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || ROUTE_PATH.HOME

  const router = useRouter()
  const onLogin = (data: LoginResponsePayload) => {
    try {
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      // router.push(ROUTE_PATH.MEMORY);
      router.push(redirect)
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {
    onLogin,
    profile,
    setProfile,
  }
}