import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@layout/components/Header/Header'), {
  ssr: false,
});

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className='mt-[133px]'>{children}</main>
    </>
  );
};

export default MainLayout;
