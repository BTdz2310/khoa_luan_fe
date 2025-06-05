import React from 'react'

import Image from 'next/image'

import ForgetForm from '@components/Authentication/Forms/ForgetForm'

const Forget = () => {
  return (
    <div className='flex p-[40px] gap-[20px] min-h-screen w-screen'>
      <div className='flex-1 relative'>
        <Image src={'/images/forget.avif'} alt="logo" fill className='object-cover object-[75%] rounded-[20px]' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center gap-[20px] pl-[80px] pr-[60px]'>
        <p className='font-space-grotesk font-semibold text-[36px]'>Quên mật khẩu</p>
        <ForgetForm />
      </div>
    </div>
  )
}

export default Forget