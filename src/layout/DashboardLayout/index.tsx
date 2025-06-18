import dynamic from 'next/dynamic';

import Navbar from './Navbar';

const Header = dynamic(() => import('@layout/components/Header/HeaderDashboard'), {
  ssr: false,
});

const DashboardLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className='mt-[72px] bg-[#F9F3EF]'>
        <div className='container mx-auto h-fit relative'>
          <div className='bg-inherit shrink-0 absolute h-full'>
            <div className='h-full w-[148px]'>
              <Navbar />
            </div>
          </div>
          <div className='w-[calc(100%-148px)] ml-[148px] min-h-[calc(100vh-72px)] h-auto relative'>
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardLayout