import React, { useState } from 'react'

import { Eye, EyeClosed } from 'lucide-react';
import { ControllerRenderProps, Path } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@components/UI/form';
import { Input } from '@components/UI/input';

type InputProps<T extends object, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
  label: string;
  className?: string;
  isRequired?: boolean;
  placeholder?: string
};

const CustomPassword = <T extends object, K extends Path<T>>({ field, label, placeholder, className, isRequired = false }: InputProps<T, K>) => {
  const [isHidden, setIsHidden] = useState(true);

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
        <div className='relative'>
          <Input
            type={isHidden ? 'password' : 'text'}
            className={className}
            placeholder={placeholder}
            {...field}
          />
          <div className='absolute top-1/2 right-[12px] -translate-y-1/2 cursor-pointer'>
            {isHidden ? (
              <EyeClosed
                className='w-[20px] h-[20px] text-[--neutral-900]'
                onClick={() => {
                  setIsHidden(false);
                }}
              />
            ) : (
              <Eye
                className='w-[20px] h-[20px] text-[--neutral-900]'
                onClick={() => {
                  setIsHidden(true);
                }}
              />
            )}
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default CustomPassword
