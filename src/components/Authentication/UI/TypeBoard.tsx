import React from 'react'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTE_PATH } from '@shared-constants/route-path'

const TypeBoard = () => {
  const pathname = usePathname()

  return (
    <div className='bg-[#48bbbd99] px-[12px] py-[16px] rounded-full gap-[20px] w-fit'>
      <Link href={ROUTE_PATH.LOGIN} className={classNames('px-[48px] py-[8px] rounded-full font-space-grotesk font-normal text-[16px] !text-white hover:underline', pathname.startsWith(ROUTE_PATH.LOGIN) && 'bg-[#49BBBD]')}>Đăng nhập</Link>
      <Link href={ROUTE_PATH.REGISTER} className={classNames('px-[48px] py-[8px] rounded-full font-space-grotesk font-normal text-[16px] !text-white hover:underline', pathname.startsWith(ROUTE_PATH.REGISTER) && 'bg-[#49BBBD]')}>Đăng ký</Link>
    </div>
  )
}

export default TypeBoard