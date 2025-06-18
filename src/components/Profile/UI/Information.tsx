import React from 'react'

import { useAuth } from '@hooks/useAuth'

const Information = () => {
  const { profile } = useAuth()

  return (
    <div className='flex flex-col gap-[24px]'>
      <div className='flex gap-[24px]'>
        <b className='font-space-grotesk w-[84px] font-bold text-[16px] text-black'>Họ và tên:</b>
        <p className='font-space-grotesk font-normal text-[16px] text-black'>{profile?.fullName ?? 'mic check 12'}</p>
      </div>
      <div className='flex gap-[24px]'>
        <b className='font-space-grotesk w-[84px] font-bold text-[16px] text-black'>Giới tính:</b>
        <p className='font-space-grotesk font-normal text-[16px] text-black'>{profile?.fullName}</p>
      </div>
      <div className='flex gap-[24px]'>
        <b className='font-space-grotesk w-[84px] font-bold text-[16px] text-black'>Ngày sinh:</b>
        <p className='font-space-grotesk font-normal text-[16px] text-black'>{profile?.birthDate}</p>
      </div>
      <div className='flex gap-[24px]'>
        <b className='font-space-grotesk w-[84px] font-bold text-[16px] text-black'>Giới thiệu:</b>
        <p className='font-space-grotesk font-normal text-[16px] text-black'>{profile?.bio}</p>
      </div>
    </div>
  )
}

export default Information