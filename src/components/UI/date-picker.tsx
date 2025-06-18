import * as React from 'react'

import { vi } from 'date-fns/locale';
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@components/UI/button'
import { Calendar } from '@components/UI/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/UI/popover'
import { cn } from '@lib/utils'

require('dayjs/locale/vi')

export default function DatePicker({ defaultValue, setValue, btnClassName, label, isRequired = false }: { defaultValue?: Date, setValue: (date: string) => void, btnClassName?: string, label?: string, isRequired?: boolean }) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue)

  const handleChange = (date: Date) => {
    setValue(dayjs(date).format('YYYY-MM-DD'))
    setDate(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            btnClassName,
            'w-full justify-start text-left font-normal',
            !date && 'text-zinc-500 dark:text-zinc-400'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? <span className='font-space-grotesk capitalize'>{dayjs(date).locale('vi').format('DD MMMM, YYYY')}</span> : <span>{label ?? ''}{isRequired && <span className='text-red-600 pl-[4px]'>*</span>}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleChange} locale={vi} autoFocus required />
      </PopoverContent>
    </Popover>
  )
}
