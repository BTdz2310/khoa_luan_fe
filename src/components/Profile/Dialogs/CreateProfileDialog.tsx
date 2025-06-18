import React, { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useMount, useRequest } from 'ahooks';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import ProfileForm from '@components/Profile/Forms/Schema/ProfileForm';
import { CreateProfileFormSchema, createProfileFormSchema } from '@components/Profile/Forms/Schema/profileSchema';
import { Button } from '@components/UI/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@components/UI/dialog'
import { Dropzone, DropZoneArea, DropzoneTrigger, useDropzone } from '@components/UI/dropzone';
import { Form } from '@components/UI/form';
import { Tabs, TabsContent } from '@components/UI/tabs';
import { Toggle } from '@components/UI/toggle';
import { useAuth } from '@hooks/useAuth';
import { DialogEnum, useDialog } from '@hooks/useDialog'
import { createHandleDropFile } from '@lib/dropzone';
import { cn } from '@lib/utils';
import { createProfileService } from '@services/account';
import { getCategoriesService } from '@services/course';
import { defaultAvatar } from '@shared-constants/user';

enum TabType {
  INFO = 'info',
  INTERESTING = 'interesting',
}

const CreateProfileDialog = () => {
  const { isOpen, close } = useDialog(DialogEnum.CREATE_PROFILE);
  const [tabValue, setTabValue] = React.useState<TabType>(TabType.INFO);
  const { profile, setProfile } = useAuth();

  const { data } = useRequest(getCategoriesService)
  const categories = useMemo(() => data?.data ?? [], [data])

  const form = useForm<CreateProfileFormSchema>({
    resolver: zodResolver(createProfileFormSchema),
    defaultValues: {
      fullName: profile?.fullName ?? undefined,
      birthDate: profile?.birthDate ?? undefined,
      gender: profile?.gender ?? undefined,
      bio: profile?.bio ?? '',
      interestings: profile?.interestings ?? [],
      portrait_photo: undefined
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    // criteriaMode: 'all',
    // shouldFocusError: true
  });

  useMount(() => {
    form.trigger()
  })

  const isFieldsValid = (...fields: (keyof CreateProfileFormSchema)[]) => {
    return fields.every(field => {
      // form.watch(field);
      return !form.formState.errors[field];
    });
  };

  const actionDropfile = (file: File) => {
    form.setValue('portrait_photo', file)
  }

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
  const avatarSrc = dropzone.fileStatuses[0]?.result;

  const { runAsync, loading } = useRequest(createProfileService, {
    manual: true,
    onSuccess: (data) => {
      setProfile(data.data)
      close()
    },
  })

  const onSubmit = (values: CreateProfileFormSchema) => {
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
    <Dialog open={isOpen}>
      <DialogContent className='w-[800px] !max-w-[unset]'>
        <DialogHeader>
          <DialogTitle className='font-space-grotesk'>{tabValue === TabType.INFO ? 'Thông tin cá nhân' : 'Chọn sở thích của bạn'}</DialogTitle>
          {tabValue === TabType.INTERESTING && <DialogDescription>Vui lòng chọn 2 mục trong số</DialogDescription>}
        </DialogHeader>
        <Tabs value={tabValue} onValueChange={(value) => setTabValue(value as TabType)}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value={TabType.INFO} className={cn(tabValue === TabType.INTERESTING && 'hidden')}>
                <div className='flex gap-[40px] items-stretch'>
                  <div className='flex flex-col gap-[20px] items-center justify-center shrink-0 pt-[20px] pb-[80px] px-[40px] rounded-[24px] bg-white/30 backdrop-blur-2xl shadow-md'>
                    <Image
                      width={200}
                      height={200}
                      src={avatarSrc ?? defaultAvatar}
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
                  <div className='w-full rounded-[24px] bg-white/30 backdrop-blur-2xl backdrop-opacity-0 shadow-md p-[40px]'>
                    <div className='h-full w-full flex flex-col justify-between gap-[20px]'>
                      <div className='flex flex-col gap-[16px]'>
                        <ProfileForm />
                      </div>
                      <div className='w-full flex justify-center gap-[20px] mt-[40px]'>
                        <Button type='reset' className='w-fit border-[#71C0BB] border-solid border-[2px] !bg-inherit px-[48px] py-[20px] rounded-[8px] flex items-center gap-[8px]' disabled={!isFieldsValid('fullName', 'birthDate', 'gender', 'bio')} onClick={() => setTabValue(TabType.INTERESTING)}>
                          <p className='font-space-grotesk font-medium text-[16px] !text-[#71C0BB]'>Tiếp tục</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value={TabType.INTERESTING} className={cn(tabValue === TabType.INFO && 'hidden')}>
                <div className='w-full flex gap-[8px] flex-wrap'>
                  {categories.map((item) => (
                    <Toggle key={item.id} value={item.id} className='w-fit px-[16px] py-[8px] rounded-[8px] border' onClick={() => form.setValue('interestings', form.getValues('interestings').includes(item.id) ? form.getValues('interestings').filter((id) => id !== item.id) : [...form.getValues('interestings'), item.id], { shouldValidate: true })}>
                      <p>{item.name}</p>
                    </Toggle>
                  ))}
                </div>
                <div className='w-full flex justify-center gap-[20px] mt-[20px]'>
                  <Button type='reset' className='w-fit border-[#71C0BB] border-solid border-[2px] !bg-inherit px-[48px] py-[20px] rounded-[8px] flex items-center gap-[8px]' onClick={() => setTabValue(TabType.INFO)}>
                    <p className='font-space-grotesk font-medium text-[16px] !text-[#71C0BB]'>Quay lại</p>
                  </Button>
                  <Button className='w-fit !bg-[#71C0BB] px-[48px] py-[22px] rounded-[8px] flex items-center gap-[8px]' disabled={!form.formState.isValid || loading} onClick={() => setTabValue(TabType.INTERESTING)}>
                    <p className='font-space-grotesk font-medium text-[16px] !text-white'>Xong</p>
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProfileDialog