import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@components/UI/button';
import { Form, FormField } from '@components/UI/form';
import { Input } from '@components/UI/input';
import { searchService } from '@services/home';

import { searchFormSchema, SearchFormSchema } from './search.schema';

const SearchForm = () => {
  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      text: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true
  });

  const { runAsync, loading } = useRequest(searchService, {
    manual: true,
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log(data)
    },
  })

  const onSubmit = (values: SearchFormSchema) => {
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
          name="text"
          render={({ field }) => (
            <div className='relative'>
              <Button disabled={loading} className='absolute top-[50%] left-[6px] translate-y-[-50%] !bg-transparent ring-0 border-none !p-0 shadow-none outline-0 w-[24px] h-[24px] flex justify-center items-center'>
                <Search className='w-[16px] h-[16px] text-[#404A60]' />
              </Button>
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                className='pl-[32px] pr-[10px] py-[10px] text-[14px] border-[#404A60]'
                {...field}
              />
            </div>
          )}
        />
      </form>
    </Form>
  )
}

export default SearchForm