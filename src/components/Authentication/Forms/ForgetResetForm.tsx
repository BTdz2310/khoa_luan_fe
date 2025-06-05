import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import CustomPassword from '@components/Forms/UI/CustomPassword';
import { Button } from '@components/UI/button';
import { Form, FormField } from '@components/UI/form';
import { forgetResetPasswordService } from '@services/auth';
import { ROUTE_PATH } from '@shared-constants/route-path';

import { forgetResetFormSchema, ForgetResetFormSchema } from './Schema/forget-reset';

const ForgetResetForm = ({ otpData }: { otpData: any }) => {
  const router = useRouter()

  const form = useForm<ForgetResetFormSchema>({
    resolver: zodResolver(forgetResetFormSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true
  });

  const { runAsync, loading } = useRequest(
    (values: ForgetResetFormSchema) => forgetResetPasswordService(otpData, values),
    {
      manual: true,
      onSuccess: (data) => {
        // eslint-disable-next-line no-console
        console.log(data)
        deleteCookie('otp_data')
        router.push(ROUTE_PATH.LOGIN)
      },
    }
  )

  const onSubmit = (values: ForgetResetFormSchema) => {
    toast.promise(runAsync(values), {
      loading: 'Đang xử lý...',
      success: (data) => {
        return data.message
      },
      error: (error) => {
        const message = (error as any)?.response?.data?.message || 'Lỗi không xác định';
        return message
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-[20px] items-start w-full'>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <CustomPassword
              field={field}
              isRequired
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              className='border border-solid !ring-0 focus:!border-[#49BBBD] focus:!shadow-[0px_0px_0px_3px_rgba(72,187,189,0.2)] caret-[#49BBBD] rounded-full h-[52px] w-full pl-[20px] !text-[16px] placeholder:text-[#ACACAC]'
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <CustomPassword
              field={field}
              isRequired
              label="Xác nhận mật khẩu"
              placeholder="Nhập mật khẩu"
              className='border border-solid !ring-0 focus:!border-[#49BBBD] focus:!shadow-[0px_0px_0px_3px_rgba(72,187,189,0.2)] caret-[#49BBBD] rounded-full h-[52px] w-full pl-[20px] !text-[16px] placeholder:text-[#ACACAC]'
            />
          )}
        />
        <Button type='submit' disabled={loading} className='bg-[#49BBBD] font-space-grotesk font-normal text-[16px] text-white rounded-full h-[52px] w-full hover:bg-[#48BBBDCC]'>
          {loading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </form>
    </Form>
  )
}

export default ForgetResetForm