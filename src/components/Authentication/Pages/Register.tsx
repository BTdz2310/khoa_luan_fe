import React from 'react'

import Image from 'next/image'

import RegisterForm from '@components/Authentication/Forms/RegisterForm'
import TypeBoard from '@components/Authentication/UI/TypeBoard'

const Register = () => {
  return (
    <div className='flex p-[40px] gap-[20px] min-h-screen w-screen'>
      <div className='flex-1 relative'>
        <Image src={'/images/register.jpg'} alt="logo" fill className='object-cover object-center rounded-[20px]' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center gap-[20px] pl-[80px] pr-[60px]'>
        <p className='font-space-grotesk font-normal text-[16px]'>Chào mừng đến với Learniverse !</p>
        <TypeBoard />
        <p className='text-[#5B5B5B] font-space-grotesk font-normal text-[16px] py-[20px]'>Tham gia ngay để truy cập hàng ngàn khoá học chất lượng, video bài giảng hấp dẫn và cộng đồng học tập năng động!</p>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register