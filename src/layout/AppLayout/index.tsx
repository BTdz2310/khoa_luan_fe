import { Toaster } from 'react-hot-toast';

const AppLayout = ({ children }: any) => {
  return (
    <>
      <main>{children}</main>
      <Toaster />
    </>
  );
};

export default AppLayout;
