import React from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import InstructorCard from '@components/InstructorCard'
import { Instructor } from '@custom-types/instructor'

const data: Instructor[] = [
  {
    full_name: 'Tom N Jerry',
    avatar: '/images/tom.jpg',
    specialize: 'Văn học',
    id: 1
  },
  {
    full_name: 'Gia tốc',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly4BLbOQd5upaCGvD5f6p44TeaiaBp7dMB-2Ifetb35UBmV2p_2KXMknjCNPz7l8squU&usqp=CAU',
    specialize: 'Vật lý',
    id: 2
  },
]

const TopInstructors = () => {
  return (
    <div className='flex items-center gap-[32px] py-[80px] container mx-auto flex-col'>
      <p className='font-space-grotesk font-bold text-[40px] text-black'>Giảng viên được đánh giá cao</p>
      <div className='flex gap-[20px] items-center'>
        <div className='flex-1'>
          <InstructorCard item={data[0]} />
        </div>
        <div className='flex-1'>
          <InstructorCard item={data[1]} />
        </div>
      </div>
      <div className='flex justify-center w-full items-center gap-[20px]'>
        <div className='w-[40px] h-[40px] rounded-full border border-solid border-white bg-black flex items-center justify-center cursor-pointer'>
          <ChevronLeft className='text-white w-[20px] h-[20px]' />
        </div>
        <div className='w-[40px] h-[40px] rounded-full border border-solid border-white bg-black flex items-center justify-center cursor-pointer'>
          <ChevronRight className='text-white w-[20px] h-[20px]' />
        </div>
      </div>
    </div>
  )
}

export default TopInstructors