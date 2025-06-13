import React from 'react'

import CourseCard from '@components/CourseCard'
import { Button } from '@components/UI/button'

const PopularCourse = () => {
  return (
    <div className='flex items-center gap-[32px] py-[80px] container mx-auto flex-col'>
      <p className='font-space-grotesk font-bold text-[40px] text-black'>Khoá học phổ biến</p>
      <div className='flex gap-[20px] items-center'>
        <div className='flex-1'>
          <CourseCard />
        </div>
        <div className='flex-1'>
          <CourseCard />
        </div>
        <div className='flex-1'>
          <CourseCard />
        </div>
        <div className='flex-1'>
          <CourseCard />
        </div>
      </div>
      <Button className='px-[40px] py-[24px] !bg-black text-white rounded-full text-[16px]'>
        Xem thêm
      </Button>
    </div>
  )
}

export default PopularCourse