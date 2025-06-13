import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { ROUTE_PATH } from '@shared-constants/route-path'
import { useAuth } from 'src/hook/useAuth'

const Hero = () => {
  const { profile } = useAuth()

  return (
    <div className='text-black relative h-[calc(100vh-133px)] flex items-center container mx-auto'>
      <div className='w-2/5 h-full shrink-0 flex flex-col gap-[12px] justify-center'>
        <h1 className='font-oswald font-bold text-[52px] h-fit'>Nâng cấp kỹ năng, bắt đầu ngay hôm nay</h1>
        <h4 className='font-space-grotesk font-normal text-[16px]'>Học nhanh, ứng dụng thực tế, tương tác trực tiếp.</h4>
        <div className='mt-[20px]'>
          {profile ? (
            <></>
          ) : (
            <Link href={ROUTE_PATH.REGISTER} className='font-space-grotesk font-semibold rounded-xl text-[16px] text-white hover:text-gray-200 py-[12px] px-[24px] bg-[#404A60] w-fit ' >Tạo tài khoản mới</Link>
          )}
        </div>
      </div>
      <div className='w-3/5 h-full shrink-0 p-[40px] pl-0 flex justify-center'>
        <Image
          src={'/images/hero.avif'}
          alt="hero"
          fill
          quality={100}
          className='object-contain object-center rounded-[20px] h-full !relative min-h-[400px]'
        />
      </div>
    </div>
  )
}

export default Hero