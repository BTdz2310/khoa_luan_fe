import React from 'react'

import { Book, Cpu, Languages, Music } from 'lucide-react'

const TopCategories = () => {
  return (
    <div className='my-[80px] flex flex-col gap-[32px] container mx-auto items-center'>
      <p className='font-space-grotesk font-bold text-[40px] text-black'>Danh mục được ưa chuộng</p>
      <div className='flex gap-[24px] items-center w-full'>
        <div className='bg-[#D2B7FF] flex-1 flex justify-center items-center relative pt-[12px] pb-[32px] border border-solid border-black rounded-[12px]'>
          <p className='font-space-grotesk font-semibold text-[20px] text-black'>Lập trình & Công nghệ</p>
          <div className='w-[52px] h-[52px] bg-[#FAD306] rounded-full flex items-center justify-center border-[2px] border-solid border-black absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2'>
            <Cpu className='w-[24px] h-[24px] text-black' />
          </div>
        </div>
        <div className='bg-[#AAC5FE] flex-1 flex justify-center items-center relative pt-[12px] pb-[32px] border border-solid border-black rounded-[12px]'>
          <p className='font-space-grotesk font-semibold text-[20px] text-black'>Ngôn ngữ</p>
          <div className='w-[52px] h-[52px] bg-[#FAD306] rounded-full flex items-center justify-center border-[2px] border-solid border-black absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2'>
            <Languages className='w-[24px] h-[24px] text-black' />
          </div>
        </div>
        <div className='bg-[#F9BBAB] flex-1 flex justify-center items-center relative pt-[12px] pb-[32px] border border-solid border-black rounded-[12px]'>
          <p className='font-space-grotesk font-semibold text-[20px] text-black'>Học tập dành cho học sinh</p>
          <div className='w-[52px] h-[52px] bg-[#FAD306] rounded-full flex items-center justify-center border-[2px] border-solid border-black absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2'>
            <Book className='w-[24px] h-[24px] text-black' />
          </div>
        </div>
        <div className='bg-[#FCEB9F] flex-1 flex justify-center items-center relative pt-[12px] pb-[32px] border border-solid border-black rounded-[12px]'>
          <p className='font-space-grotesk font-semibold text-[20px] text-black'>Nghệ thuật & Giải trí</p>
          <div className='w-[52px] h-[52px] bg-[#FAD306] rounded-full flex items-center justify-center border-[2px] border-solid border-black absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2'>
            <Music className='w-[24px] h-[24px] text-black' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopCategories