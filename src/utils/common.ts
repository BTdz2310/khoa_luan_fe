import dayjs from 'dayjs';

export function isValidDate(dateStr: string) {
  return dayjs(dateStr, 'YYYY-MM-DD', true).isValid();
};