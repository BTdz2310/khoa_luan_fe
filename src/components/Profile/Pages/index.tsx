import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRequest } from 'ahooks'
import { Pen } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import ProfileForm from '@components/Profile/Forms/Schema/ProfileForm'
import { profileFormSchema, ProfileFormSchema } from '@components/Profile/Forms/Schema/profileSchema'
import Information from '@components/Profile/UI/Information'
import { Button } from '@components/UI/button'
import { Dropzone, DropZoneArea, DropzoneTrigger, useDropzone } from '@components/UI/dropzone'
import { Form } from '@components/UI/form'
import { Tabs, TabsContent } from '@components/UI/tabs'
import { Gender } from '@custom-types/user'
import { useAuth } from '@hooks/useAuth'
import { createHandleDropFile } from '@lib/dropzone'
import { cn } from '@lib/utils'
import { editProfileService } from '@services/account'
import { defaultAvatar } from '@shared-constants/user'

enum ProfileTab {
  INFORMATION = 'information',
  FORM = 'form',
}

const Profile = () => {
  const [tabValue, setTabValue] = useState<ProfileTab>(ProfileTab.INFORMATION)
  const { profile } = useAuth()

  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: profile?.fullName ?? '',
      birthDate: profile?.birthDate ?? '',
      gender: profile?.gender ?? Gender.Male,
      bio: profile?.bio ?? '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const actionDropfile = () => {}

  const dropzone = useDropzone({
    onDropFile: createHandleDropFile(actionDropfile),
    validation: {
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg'],
      },
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  });

  const { runAsync, loading } = useRequest(editProfileService, {
    manual: true,
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log(data)
      // setProfile({
      //   ...profile,
      //   user: data.data
      // })
    },
  })

  const onSubmit = (values: ProfileFormSchema) => {
    toast.promise(runAsync(values), {
      loading: 'Đang xử lý...',
      success: (data) => {
        return data.message
      },
      error: (error) => {
        const message = (error as any)?.message || 'Lỗi không xác định';
        return message
      }
    })
  }

  return (
    <div className='absolute inset-0 w-full h-full pl-[20px] pt-[20px] pb-[20px]'>
      <div className='h-full w-full bg-inherit rounded-[32px] p-[40px] mb-[40px]'>
        <div className='flex gap-[40px] items-stretch'>
          <div className='flex flex-col gap-[20px] items-center justify-center shrink-0 pt-[20px] pb-[80px] px-[40px] rounded-[24px] bg-white/30 backdrop-blur-2xl shadow-md'>
            <Image
              width={200}
              height={200}
              src={profile?.avatar ?? defaultAvatar}
              className='object-cover rounded-[12px] w-[200px] h-[200px]'
              alt="avatar"
            />
            <Dropzone {...dropzone}>
              <DropZoneArea>
                <DropzoneTrigger className="rounded-[8px] items-center flex w-full flex-col justify-center gap-[4px] border-[1px] border-dashed border-[--neutral-200-border] px-[16px] py-[12px] bg-inherit">
                  <div className='flex items-center gap-[4px]'>
                    <p className='text-[--info-info] text-body-regular'>
                      <b className='pr-1 text-body-semibold'>Tải ảnh lên</b>
                      hoặc kéo thả tệp
                    </p>
                  </div>
                </DropzoneTrigger>
              </DropZoneArea>
            </Dropzone>
          </div>
          <div className='w-full rounded-[24px] bg-white/30 backdrop-blur-2xl backdrop-opacity-0 shadow-md'>
            <Tabs value={tabValue} onValueChange={(value) => setTabValue(value as ProfileTab)} className='h-full'>
              <TabsContent value={ProfileTab.INFORMATION} className={cn('h-full w-full flex flex-col px-[40px] items-center justify-evenly gap-[40px] mt-0', tabValue === ProfileTab.FORM && 'hidden')}>
                <p className='font-space-grotesk font-bold text-[20px] text-[#71C0BB]'>Thông tin cá nhân</p>
                <Information />
                <Button className='w-fit border-[#71C0BB] border-solid border-[2px] !bg-inherit px-[32px] py-[24px] rounded-[8px] flex items-center gap-[8px]' onClick={() => setTabValue(ProfileTab.FORM)}>
                  <Pen className='text-[#71C0BB]' />
                  <p className='font-space-grotesk font-medium text-[16px] text-[#71C0BB]'>Chỉnh sửa</p>
                </Button>
              </TabsContent>
              <TabsContent value={ProfileTab.FORM} className={cn('p-[40px] mt-0', tabValue === ProfileTab.INFORMATION && 'hidden')}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='h-full w-full flex flex-col justify-between gap-[20px]'>
                    <p className='font-space-grotesk font-bold text-[20px] text-[#71C0BB] w-full text-center'>Chỉnh sửa thông tin cá nhân</p>
                    <div className='flex flex-col gap-[16px]'>
                      <ProfileForm />
                    </div>
                    <div className='w-full flex justify-center gap-[20px] mt-[40px]'>
                      <Button type='reset' className='w-fit border-[#71C0BB] border-solid border-[2px] !bg-inherit px-[48px] py-[20px] rounded-[8px] flex items-center gap-[8px]' onClick={() => setTabValue(ProfileTab.INFORMATION)}>
                        <p className='font-space-grotesk font-medium text-[16px] !text-[#71C0BB]'>Huỷ</p>
                      </Button>
                      <Button className='w-fit !bg-[#71C0BB] px-[48px] py-[22px] rounded-[8px] flex items-center gap-[8px]' disabled={!form.formState.isValid || loading}>
                        <p className='font-space-grotesk font-medium text-[16px] !text-white'>Xác nhận</p>
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile