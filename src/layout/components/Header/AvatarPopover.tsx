import React from 'react'

import { FolderKanban, LogOut, UserRoundPen } from 'lucide-react'
import Link from 'next/link'

import { Popover, PopoverContent, PopoverTrigger } from '@components/UI/popover'
import { useAuth } from '@hooks/useAuth'
import { ROUTE_PATH } from '@shared-constants/route-path'

const AvatarPopover = () => {
  const { auth, logout } = useAuth()

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <div className="h-[32px] w-[32px] rounded-full bg-red-200 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-[200px] right-0 absolute top-2 py-[12px] px-[6px] rounded-[12px]">
          <div className="flex gap-4 items-center pb-[12px] px-[6px]">
            <img className="h-[28px] w-[28px] rounded-full bg-red-200" />
            <p className="font-open-sans text-sm font-semibold">{auth?.username}</p>
          </div>
          <div className="py-[6px] flex flex-col gap-0">
            <div className="flex items-center gap-4 cursor-pointer hover:bg-accent py-[6px] px-[6px] rounded-lg">
              <UserRoundPen className='w-[16px] h-[16px] m-[2px]' />
              <p className="font-open-sans text-sm">Profile</p>
            </div>
            <Link href={ROUTE_PATH.DASHBOARD} className="flex items-center gap-4 cursor-pointer hover:bg-accent py-[6px] px-[6px] rounded-lg">
              <FolderKanban className='w-[16px] h-[16px] m-[2px]' />
              <p className="font-open-sans text-sm">Dashboard</p>
            </Link>
          </div>
          <div className="pt-[6px] border-t">
            <div className="flex items-center gap-4 cursor-pointer hover:bg-accent py-[6px] px-[6px] rounded-lg" onClick={logout}>
              <LogOut className='w-[16px] h-[16px] text-red-500 m-[2px]' />
              <p className="font-open-sans text-sm">Logout</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default AvatarPopover