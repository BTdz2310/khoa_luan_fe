import React from 'react'

import TestimonalCard from '@components/TestimonalCard'

const Testimonals = () => {
  return (
    <div className='flex items-center gap-[32px] py-[80px] container mx-auto flex-col'>
      <p className='font-space-grotesk font-bold text-[40px] text-black'>Giảng viên được đánh giá cao</p>
      <div className='flex gap-[20px] items-center'>
        <div className='flex-1'>
          <TestimonalCard />
        </div>
        <div className='flex-1'>
          <TestimonalCard />
        </div>
      </div>
    </div>
  )
}

export default Testimonals