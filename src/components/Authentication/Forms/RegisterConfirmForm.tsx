import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input'
import { z } from 'zod';

import { Button } from '@components/UI/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/UI/form';
import { Remember } from '@custom-types/otp';
import { setCookieOtp } from '@lib/otp';
import { cn } from '@lib/utils';
import { activateService, resendActivateService } from '@services/auth';
import { ROUTE_PATH } from '@shared-constants/route-path';

import { registerConfirmSchema, RegisterConfirmSchema } from './Schema/register-confirm';

const long = 59;

const RegisterConfirmForm = ({ otpData }: { otpData: Remember }) => {
  const [otpValue, setOtpValue] = useState(otpData.hash_code)
  const [timer, setTimer] = useState(long);
  const router = useRouter()

  useEffect(() => {
    const timerId = setInterval(() => setTimer(prev => prev === 0 ? 0 : prev - 1), 1000);

    return () => clearInterval(timerId);
  });

  const form = useForm<z.infer<typeof registerConfirmSchema>>({
    resolver: zodResolver(registerConfirmSchema),
    defaultValues: {
      verification_code: ''
    },
  });

  const { runAsync: registerFn, loading: registerLoading } = useRequest(
    (values: RegisterConfirmSchema) => activateService({
      ...otpData,
      hash_code: otpValue
    }, values.verification_code),
    {
      manual: true,
      onSuccess: () => {
        deleteCookie('otp_data')
        router.push(ROUTE_PATH.LOGIN)
      }
    }
  )

  const onSubmit = (values: RegisterConfirmSchema) => {
    toast.promise(registerFn(values), {
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

  const { runAsync: resendFn } = useRequest(
    () => resendActivateService(otpData.email, otpData.user_id as number),
    {
      manual: true,
      onSuccess: (data) => {
        setOtpValue(data.data.hashCode)
        setCookieOtp({
          ...otpData,
          hash_code: data.data.hashCode
        })
      },
    }
  )

  const handleResend = () => {
    if (timer === 0) {
      setTimer(long)
    }
    toast.promise(resendFn, {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='grow flex flex-col justify-center'>
          <p className='text-[#5B5B5B] font-space-grotesk font-normal text-[16px] py-[32px]'>
            Vui lòng nhập mã OTP đã được gửi đến email
            <b className='pl-1 font-semibold'>{otpData.email}</b>
          </p>
          <FormField
            control={form.control}
            name='verification_code'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    numInputs={6}
                    containerStyle="flex justify-between gap-[1.4px]"
                    inputStyle="max-w-[56px] flex-1 focus:border-[--secon-secon] !h-[56px] rounded-[8px] outline-[0px] border-[1px] border-disabled text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[24px] leading-[32px] font-medium"
                    inputType="number"
                    renderInput={props => <input {...props} />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-[32px] bg-[#49BBBD] font-space-grotesk font-normal text-[16px] text-white rounded-full h-[52px] w-full hover:bg-[#48BBBDCC]' disabled={!form.formState.isValid || registerLoading}>
            {registerLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>
          <div className='text-center mt-[24px]'>
            <span className='text-body-regular'>Bạn chưa nhận được mã? {' '}</span>
            {/* {timer !== 0 && <b className='text-dark'>(00:{`${timer < 10 ? '0' : ''}${timer}`})</b>} */}
            <b className={cn('font-semibold text-[14px] leading-[22px] text-[--tertirial-tertirial]', timer === 0 && 'cursor-pointer')} onClick={() => {
              if (timer === 0) {
                handleResend()
              }
            }}>
              <span className={cn('underline pr-1', timer !== 0 && 'text-[--text-disabled]')}>Gửi lại mã</span>
              (00:{`${timer < 10 ? '0' : ''}${timer}`})
            </b>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default RegisterConfirmForm