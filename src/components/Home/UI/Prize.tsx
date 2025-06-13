import React from 'react'

import { Award, CircleCheck, Video } from 'lucide-react'

const Prize = () => {
  return (
    <div className='py-[32px] bg-white my-[40px]'>
      <div className='container mx-auto flex items-center justify-between px-[80px]'>
        <div className='flex items-center gap-[16px]'>
          <div className='bg-[#4C59FD] w-[40px] h-[40px] rounded-full flex items-center justify-center'>
            <Award className='text-white w-[20px] h-[20px]' />
          </div>
          <div>
            <p className='font-space-grotesk font-semibold text-[20px] text-black'>Vô vàn giảng viên</p>
            <p className='font-space-grotesk font-normal text-[16px] text-black'><b className='font-semibold'>1,600</b> khoá học</p>
          </div>
        </div>
        <div className='flex items-center gap-[16px]'>
          <div className='bg-[#3999FC] w-[40px] h-[40px] rounded-full flex items-center justify-center'>
            <Video className='text-white w-[20px] h-[20px]' />
          </div>
          <div>
            <p className='font-space-grotesk font-semibold text-[20px] text-black'>Lớp học trực tuyến & video xem lại</p>
            <p className='font-space-grotesk font-normal text-[16px] text-black'><b className='font-semibold'>189,500</b> bài giảng</p>
          </div>
        </div>
        <div className='flex items-center gap-[16px]'>
          <div className='bg-[#F6A18E] w-[40px] h-[40px] rounded-full flex items-center justify-center'>
            <CircleCheck className='text-white w-[20px] h-[20px]' />
          </div>
          <div>
            <p className='font-space-grotesk font-semibold text-[20px] text-black'>Học viên đông đảo</p>
            <p className='font-space-grotesk font-normal text-[16px] text-black'><b className='font-semibold'>289,500</b> học viên</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prize