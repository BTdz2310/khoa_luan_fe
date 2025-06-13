import React from 'react'

import Image from 'next/image'

import StarRating from './StarRating'

const CourseCard = () => {
  return (
    <div className='w-full border border-solid border-black rounded-[12px] p-[8px] pb-[16px] gap-[12px] flex flex-col'>
      <Image
        src={'/images/course-fake.jpg'}
        alt="course"
        width={0}
        height={0}
        className='w-full h-[180px] object-cover object-center rounded-[8px]'
      />
      <p className='font-space-grotesk font-semibold text-[20px]'>Digital Marketing & with Basics to Advance</p>
      <p className='font-space-grotesk font-normal text-base'>Clifford Lampe</p>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-[4px]'>
          <p className='font-space-grotesk font-semibold text-base'>5.0</p>
          <StarRating rating={5} />
        </div>
        <p className='font-space-grotesk text-base font-normal text-[#acacac]'>(234,89)</p>
      </div>
      <p className='text-[24px] font-semibold font-space-grotesk'>$20.5</p>
    </div>
  )
}

export default CourseCard