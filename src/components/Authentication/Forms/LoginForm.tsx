import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import CustomInput from '@components/Forms/UI/CustomInput';
import CustomPassword from '@components/Forms/UI/CustomPassword';
import { Button } from '@components/UI/button';
import { Form, FormField } from '@components/UI/form';
import { loginService } from '@services/auth';
import { ROUTE_PATH } from '@shared-constants/route-path';
import { useAuth } from 'src/hook/useAuth';

import { LoginFormSchema, loginFormSchema } from './Schema/login';

const LoginForm = () => {
  const { onLogin } = useAuth()

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true
  });

  const { runAsync, loading } = useRequest(loginService, {
    manual: true,
    onSuccess: (data) => {
      onLogin(data.data)
    },
  })

  const onSubmit = (values: LoginFormSchema) => {
    toast.promise(runAsync(values), {
      loading: 'Đang đăng nhập...',
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
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              className='border border-solid !ring-0 focus:!border-[#49BBBD] focus:!shadow-[0px_0px_0px_3px_rgba(72,187,189,0.2)] caret-[#49BBBD] rounded-full h-[52px] w-full pl-[20px] !text-[16px] placeholder:text-[#ACACAC]'
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <CustomPassword
              field={field}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              className='border border-solid !ring-0 focus:!border-[#49BBBD] focus:!shadow-[0px_0px_0px_3px_rgba(72,187,189,0.2)] caret-[#49BBBD] rounded-full h-[52px] w-full pl-[20px] !text-[16px] placeholder:text-[#ACACAC]'
            />
          )}
        />
        <Link href={ROUTE_PATH.FORGET} className='font-space-grotesk font-normal text-[16px] self-end !text-[#5B5B5B] hover:underline'>Bạn quên mật khẩu?</Link>
        <Button type='submit' disabled={loading} className='bg-[#49BBBD] font-space-grotesk font-normal text-[16px] text-white rounded-full h-[52px] w-full hover:bg-[#48BBBDCC]'>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm