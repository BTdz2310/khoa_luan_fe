import React from 'react'

import Image from 'next/image'


import ForgetResetForm from '@components/Authentication/Forms/ForgetResetForm'
import { Remember } from '@custom-types/otp'

const ForgetReset = ({ otpData }: { otpData: Remember }) => {
  return (
    <div className='flex p-[40px] gap-[20px] min-h-screen w-screen'>
      <div className='flex-1 relative'>
        <Image src={'/images/reset.jpg'} alt="logo" fill className='object-cover object-[75%] rounded-[20px]' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center gap-[20px] pl-[80px] pr-[60px]'>
        <p className='font-space-grotesk font-semibold text-[36px]'>Đặt lại mật khẩu</p>
        <ForgetResetForm otpData={otpData} />
      </div>
    </div>
  )
}

export default ForgetReset