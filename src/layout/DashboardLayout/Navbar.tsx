import React from 'react'

import { Bell, BookCheck, ChartArea, House, MessageCircleMore, User } from 'lucide-react'
import Link from 'next/link'

import { ROUTE_PATH } from '@shared-constants/route-path'

const Navbar = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-[20px]'>
      <Link href={ROUTE_PATH.DASHBOARD} className='w-[40px] h-[40px] flex justify-center items-center'>
        <House className='text-black h-[24px] w-[24px]' />
      </Link>
      <Link href={ROUTE_PATH.PROFILE} className='w-[40px] h-[40px] flex justify-center items-center'>
        <User className='text-black h-[24px] w-[24px]' />
      </Link>
      <Link href={''} className='w-[40px] h-[40px] flex justify-center items-center'>
        <ChartArea className='text-black h-[24px] w-[24px]' />
      </Link>
      <Link href={''} className='w-[40px] h-[40px] flex justify-center items-center'>
        <BookCheck className='text-black h-[24px] w-[24px]' />
      </Link>
      <Link href={''} className='w-[40px] h-[40px] flex justify-center items-center'>
        <MessageCircleMore className='text-black h-[24px] w-[24px]' />
      </Link>
      <Link href={''} className='w-[40px] h-[40px] flex justify-center items-center'>
        <Bell className='text-black h-[24px] w-[24px]' />
      </Link>
    </div>
  )
}

export default Navbar