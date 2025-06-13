import React from 'react'

import Image from 'next/image'

const TestimonalCard = () => {
  return (
    <div className='w-full p-[12px] rounded-[12px] bg-[#FCE46D] flex items-center justify-between relative'>
      <div className='w-1/3 flex flex-col justify-between gap-[12px]'>
        <div className='w-full flex items-center gap-[8px]'>
          <Image
            src="https://www.visaplace.com/wp-content/uploads/2012/10/teacher-immigrate-to-canada.png"
            alt="avatar"
            width={80}
            height={80}
            className='h-[80px] w-[80px] object-cover object-center rounded-full'
          />
          <Image
            src={'https://endlessicons.com/wp-content/uploads/2013/04/star-icon-614x460.png'}
            alt='banger'
            width={60}
            height={60}
            className='w-[60px] h-[60px] self-start'
          />
        </div>
        <p className='font-space-grotesk font-semibold text-[20px]'>John Doe</p>
        <p className='font-space-grotesk font-normal text-base'>Sinh viên</p>
      </div>
      <div className='w-[2px] h-[120px] bg-[#404A60]'></div>
      <p className='w-1/2 font-space-grotesk text-[#acacac] text-base font-normal'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At quibusdam consequatur dolores itaque velit mollitia voluptatibus necessitatibus dolor magnam eligendi, quidem dignissimos modi! Quam quis aliquam tempora at possimus quibusdam!
      </p>
    </div>
  )
}

export default TestimonalCard