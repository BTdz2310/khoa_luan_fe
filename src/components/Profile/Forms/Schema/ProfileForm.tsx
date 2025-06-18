import React from 'react'


import { useFormContext } from 'react-hook-form';

import DatePicker from '@components/UI/date-picker';
import { FormField } from '@components/UI/form';
import { Label } from '@components/UI/label';
import { RadioGroup, RadioGroupItem } from '@components/UI/radio-group';
import { Textarea } from '@components/UI/textarea';
import { Gender } from '@custom-types/user';

const ProfileForm = () => {
  const { control, setValue } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <div className="relative z-0 w-full group">
            <input type="text" name="fullName"className="font-space-grotesk block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#49BBBD] focus:outline-none focus:ring-0 focus:border-[#49BBBD] peer" placeholder=" " value={field.value} onChange={(e) => setValue('fullName', e.target.value, { shouldValidate: true })} />
            <label htmlFor="fullName" className="font-space-grotesk peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#49BBBD] peer-focus:dark:text-[#49BBBD] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Họ và tên<span className='text-red-600 pl-[4px]'>*</span></label>
          </div>
        )}
      />
      <FormField
        control={control}
        name="birthDate"
        render={({ field }) => (
          <DatePicker defaultValue={field.value ? new Date(field.value) : undefined} setValue={(date) => setValue('birthDate', date, { shouldValidate: true })} btnClassName='h-[37px] bg-transparent !rounded-[0px] !border-0 shadow-none !border-b-2 !border-gray-300 !border-solid !px-0' label='Ngày sinh' isRequired />
        )}
      />
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <RadioGroup className="relative z-0 w-full mt-[12px]" value={field.value} onValueChange={(value) => setValue('gender', value, { shouldValidate: true })}>
            <legend className="font-space-grotesk absolute left-0 text-gray-500 transform scale-75 -translate-x-2 -top-3 origin-0">Giới tính<span className='text-red-600 pl-[4px]'>*</span></legend>
            <div className="flex gap-[20px] pt-4 pb-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Gender.Male} id="option-one" />
                <Label htmlFor="option-one" className='font-space-grotesk'>Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Gender.Female} id="option-two" />
                <Label htmlFor="option-two" className='font-space-grotesk'>Nữ</Label>
              </div>
            </div>
          </RadioGroup>
        )}
      />
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <div className="relative z-0 w-full group">
            <Textarea
              className='font-space-grotesk field-sizing-content !rounded-none !min-h-[unset] block py-2.5 px-0 w-full text-sm text-gray-900 !bg-transparent border-0 !ring-[0px] !shadow-none border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#49BBBD] focus:outline-none focus:ring-0 focus:border-[#49BBBD] peer'
              placeholder=' '
              {...field}
              onChange={(e) => setValue('bio', e.target.value, { shouldValidate: true })}
              name='bio'
            />
            {/* <textarea name="bio" id="bio" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#49BBBD] focus:outline-none focus:ring-0 focus:border-[#49BBBD] peer" placeholder=" " value={field.value} onChange={field.onChange} /> */}
            <label htmlFor="bio" className="font-space-grotesk peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#49BBBD] peer-focus:dark:text-[#49BBBD] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giới thiệu</label>
          </div>
        )}
      />
    </>
  )
}

export default ProfileForm