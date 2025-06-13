import React from 'react'

import Image from 'next/image'

import StarRating from '@components/StarRating'
import { Instructor } from '@custom-types/instructor'

const InstructorCard = ({ item }: { item: Instructor }) => {
  return (
    <div className='w-full border border-solid border-black rounded-[12px] p-[8px] pb-[16px] gap-[12px] flex flex-col'>
      <Image
        src={item.avatar}
        alt="avatar"
        width={100}
        height={100}
        className='w-full h-[180px] object-cover object-center rounded-[8px]'
      />
      <p className='font-space-grotesk font-semibold text-[20px]'>{item.full_name}</p>
      <p className='font-space-grotesk font-normal text-base'>{item.specialize}</p>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-[4px]'>
          <p className='font-space-grotesk font-semibold text-base'>5.0</p>
          <StarRating rating={5} />
        </div>
        <p className='font-space-grotesk text-[#acacac]'>(234,89)</p>
      </div>
    </div>
  )
}

export default InstructorCard