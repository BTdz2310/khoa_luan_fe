import React from 'react'

import { Menu } from 'lucide-react'
import Link from 'next/link'

import SearchForm from '@components/Home/Forms/Search'
import { ROUTE_PATH } from '@shared-constants/route-path'
import { useAuth } from 'src/hook/useAuth'

import AvatarPopover from './AvatarPopover'

const Header = () => {
  const { profile } = useAuth()

  return (
    <header className='fixed inset-0 z-50 w-screen bg-[#F9F3EF] h-fit'>
      <div className='w-full border-b border-solid border-[#acacac]'>
        <div className='container h-[72px] flex justify-between mx-auto items-center px-[20px] sm:px-0'>
          <div className='flex items-center gap-[32px]'>
            <Link href={ROUTE_PATH.HOME} className='font-serif font-bold text-[24px] text-black'>Learniverse</Link>
            <SearchForm />
          </div>
          <div>
            {profile ? (
              <>
                <AvatarPopover />
              </>
            ) : (
              <Link href={ROUTE_PATH.LOGIN} className='font-space-grotesk font-semibold text-[16px] text-white hover:text-gray-200 py-[12px] px-[24px] bg-[#404A60]'>Đăng nhập</Link>
            )}
          </div>
        </div>
      </div>
      <div className='container mx-auto py-[20px] flex items-center'>
        <div className='flex w-fit items-center gap-[8px] pr-[32px] border-r border-solid border-[#acacac]'>
          <Menu className='w-[20px] h-[20px]' />
          <p className='font-space-grotesk text-black text-[14px]'>Danh mục</p>
        </div>
        <div className='flex pl-[32px] items-center gap-[40px]'>
          <Link href={''} className='font-oswald text-[#404A60] text-[14px] font-semibold tracking-wide' >Khoá học</Link>
          <Link href={''} className='font-oswald text-[#404A60] text-[14px] font-semibold tracking-wide' >Giảng viên</Link>
          <Link href={''} className='font-oswald text-[#404A60] text-[14px] font-semibold tracking-wide' >Về chúng tôi</Link>
          <Link href={''} className='font-oswald text-[#404A60] text-[14px] font-semibold tracking-wide' >Liên hệ</Link>
        </div>
      </div>
    </header>
  )
}

export default Header