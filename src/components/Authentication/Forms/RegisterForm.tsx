import React, { useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import CustomInput from '@components/Forms/UI/CustomInput';
import CustomPassword from '@components/Forms/UI/CustomPassword';
import { Button } from '@components/UI/button';
import { Form, FormField } from '@components/UI/form';
import { Remember, RememberType } from '@custom-types/otp';
import { setCookieOtp } from '@lib/otp';
import { registerService } from '@services/auth';
import { ROUTE_PATH } from '@shared-constants/route-path';

import { registerFormSchema, RegisterFormSchema } from './Schema/register';

const RegisterForm = () => {
  const usernameRef = useRef<string>('')
  const router = useRouter()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true
  });

  useEffect(() => {
    form.trigger('confirm_password');
  }, [form.watch('password')]);

  const { runAsync, loading } = useRequest(registerService, {
    manual: true,
    onSuccess: (data) => {
      const remember: Remember = {
        type: RememberType.Register,
        hash_code: data.data.hashCode,
        email: form.getValues('email'),
        user_id: data.data.authId,
        username: form.getValues('username')
      }
      setCookieOtp(remember)
      router.push(ROUTE_PATH.REGISTER_CONFIRM)
    },
  })

  const onSubmit = (values: RegisterFormSchema) => {
    usernameRef.current = values.username
    toast.promise(runAsync(values), {
      loading: 'Đang đăng ký...',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-[20px] items-start w-full'>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <CustomInput
              field={field}
              isRequired
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              inputClassName='border border-solid !ring-0 focus:!border-[#49BBBD] focus:!shadow-[0px_0px_0px_3px_rgba(72,187,189,0.2)] caret-[#49BBBD] rounded-full h-[52px] w-full pl-[20px] !text-[16px] placeholder:text-[#ACACAC]'
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <CustomInput
              field={field}
              isRequired
              label="Email"
              placeholder="Nhập email"
              inputClassName='border border-solid !ring-0 focus:!border-[#49BBBD] focus:!shadow-[0px_0px_0px_3px_rgba(72,187,189,0.2)] caret-[#49BBBD] rounded-full h-[52px] w-full pl-[20px] !text-[16px] placeholder:text-[#ACACAC]'
            />
          )}
        />
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
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm