import React, { Suspense } from 'react'

import dynamic from 'next/dynamic';

import { DialogEnum, useDialog } from '@hooks/useDialog';


const CreateProfile = dynamic(() => import('@components/Profile/Dialogs/CreateProfileDialog'), {
  ssr: false,
});

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen: isOpenCreateProfile } = useDialog(DialogEnum.CREATE_PROFILE)

  return (
    <>
      {children}
      <Suspense fallback={null}>
        {isOpenCreateProfile && <CreateProfile />}
      </Suspense>
    </>
  )
}

export default DialogProvider