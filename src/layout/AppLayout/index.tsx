import { useMount } from 'ahooks';
import { Toaster } from 'react-hot-toast';

import { useAuth } from 'src/hook/useAuth';

const AppLayout = ({ children }: any) => {
  const { getProfile } = useAuth();

  useMount(getProfile)

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default AppLayout;
