import React from 'react'

import Image from 'next/image'

import LoginForm from '@components/Authentication/Forms/LoginForm'
import TypeBoard from '@components/Authentication/UI/TypeBoard'

const Login = () => {
  return (
    <div className='flex p-[40px] gap-[20px] min-h-screen w-screen'>
      <div className='flex-1 relative'>
        <Image src={'/images/login.jpg'} alt="logo" fill className='object-cover object-center rounded-[20px]' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center gap-[20px] pl-[80px] pr-[60px]'>
        <p className='font-space-grotesk font-normal text-[16px]'>Chào mừng đến với Learniverse !</p>
        <TypeBoard />
        <p className='text-[#5B5B5B] font-space-grotesk font-normal text-[16px] py-[20px]'>Chào mừng bạn quay trở lại! Hãy tiếp tục hành trình khám phá tri thức, phát triển kỹ năng và tiến gần hơn đến phiên bản tốt nhất của chính mình.</p>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login