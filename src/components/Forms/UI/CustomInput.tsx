import React from 'react'

import { Path, ControllerRenderProps } from 'react-hook-form'

import { FormControl, FormItem, FormLabel, FormMessage } from '@components/UI/form'
import { Input } from '@components/UI/input'

type InputProps<T extends object, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
  label: string;
  className?: string;
  isRequired?: boolean;
  placeholder?: string
};

const CustomInput = <T extends object, K extends Path<T>>({ field, className, isRequired = false, label, placeholder = '' }: InputProps<T, K>) => {
  return (
    <FormItem className='w-full'>
      {label && (
        <FormLabel>
          <p className='text-black font-space-grotesk font-normal text-[16px] mb-[12px]'>
            {label}
            {isRequired && <span className='text-red-600 pl-[4px]'>*</span>}
          </p>
        </FormLabel>
      )}
      <FormControl>
        <Input
          className={className}
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default CustomInput