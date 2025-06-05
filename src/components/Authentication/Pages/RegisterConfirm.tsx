import React from 'react'

import Image from 'next/image'

import RegisterConfirmForm from '@components/Authentication/Forms/RegisterConfirmForm'
import { Remember } from '@custom-types/otp'


const RegisterConfirm = ({ otpData }: { otpData: Remember }) => {
  return (
    <div className='flex p-[40px] gap-[20px] min-h-screen w-screen'>
      <div className='flex-1 relative'>
        <Image src={'/images/forget-confirm.jpg'} alt="logo" fill className='object-cover object-[75%] rounded-[20px]' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center gap-[20px] pl-[80px] pr-[60px]'>
        <p className='font-space-grotesk font-semibold text-[36px]'>Xác thực OTP</p>
        <RegisterConfirmForm otpData={otpData} />
      </div>
    </div>
  )
}

export default RegisterConfirm