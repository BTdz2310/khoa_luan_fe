import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import CustomInput from '@components/Forms/UI/CustomInput';
import { Button } from '@components/UI/button';
import { Form, FormField } from '@components/UI/form';
import { Remember, RememberType } from '@custom-types/otp';
import { setCookieOtp } from '@lib/otp';
import { forgetPasswordService } from '@services/auth';
import { ROUTE_PATH } from '@shared-constants/route-path';

import { forgetFormSchema, ForgetFormSchema } from './Schema/forget';

const ForgetForm = () => {
  const router = useRouter()

  const form = useForm<ForgetFormSchema>({
    resolver: zodResolver(forgetFormSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true
  });

  const { runAsync, loading } = useRequest(forgetPasswordService, {
    manual: true,
    onSuccess: (data) => {
      const remember: Remember = {
        type: RememberType.Forget,
        hash_code: data.data.hash_code,
        email: form.getValues('email'),
        user_id: data.data.user_id,
      }
      setCookieOtp(remember)
      router.push(ROUTE_PATH.FORGET_CONFIRM)
    },
  })

  const onSubmit = (values: ForgetFormSchema) => {
    toast.promise(runAsync(values.email), {
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
          name="email"
          render={({ field }) => (
            <CustomInput
              field={field}
              label="Email"
              placeholder="Nhập email"
              className='border border-solid !ring-0 focus:!border-[#49BBBD] focus:!shadow-[0px_0px_0px_3px_rgba(72,187,189,0.2)] caret-[#49BBBD] rounded-full h-[52px] w-full pl-[20px] !text-[16px] placeholder:text-[#ACACAC]'
            />
          )}
        />
        <Link href={ROUTE_PATH.LOGIN} className='font-space-grotesk font-normal text-[16px] self-end !text-[#5B5B5B] hover:underline'>Quay lại Đăng nhập</Link>
        <Button type='submit' disabled={loading} className='bg-[#49BBBD] font-space-grotesk font-normal text-[16px] text-white rounded-full h-[52px] w-full hover:bg-[#48BBBDCC]'>
          {loading ? 'Đang xử lý...' : 'Quên mật khẩu'}
        </Button>
      </form>
    </Form>
  )
}

export default ForgetForm