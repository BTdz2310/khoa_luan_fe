import { atom, useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export const profileAtom = atom<Profile | null>(null)
export const subscriptionAtom = atom<Subscription | null>(null)

export const useAuth = () => {
  const [profile, setProfile] = useAtom(profileAtom)
  const [subscription, setSubscription] = useAtom(subscriptionAtom)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || ROUTE_PATH.MEMORY

  const router = useRouter()
  const onLogin = (data: any) => {
    try {
      setAccessToken(data.data.access)
      setRefreshToken(data.data.refresh)
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
    subscription,
    setSubscription
  }
}