import React from 'react'

import dynamic from 'next/dynamic';
import Link from 'next/link'

import { useAuth } from '@hooks/useAuth'
import { ROUTE_PATH } from '@shared-constants/route-path'

const AvatarPopover = dynamic(() => import('@layout/components/Header/AvatarPopover'), {
  ssr: false,
});

const HeaderDashboard = () => {
  const { auth, isLoadedProfile } = useAuth()

  return (
    <header className='fixed inset-0 z-50 w-screen bg-[#F9F3EF] h-fit'>
      <div className='w-full'>
        <div className='container h-[72px] flex justify-between mx-auto items-center px-[20px] sm:px-0'>
          <div className='flex items-center gap-[32px]'>
            <Link href={ROUTE_PATH.HOME} className='font-serif font-bold text-[24px] text-black w-[148px]'>Learniverse</Link>
          </div>
          <div>
            {
              isLoadedProfile ? auth ? (
                <AvatarPopover />
              ) : (
                <Link href={ROUTE_PATH.LOGIN} className='font-space-grotesk font-semibold text-[16px] text-white hover:text-gray-200 py-[12px] px-[24px] bg-[#404A60]'>Đăng nhập</Link>
              )
                : null
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderDashboard