import { monthToLocal } from '@/shared/types';
import { formateDate } from '@/shared/utils';
import { FC, useMemo } from 'react';

interface DateScheduleProps {
  date: string;
  time: string;
}

const DateSchedule: FC<DateScheduleProps> = ({ date, time }) => {
  const currentFormateDate = useMemo(() => {
    return formateDate(date);
  }, [date]);

  return (
    <>
      {currentFormateDate.getDate()}{' '}
      {monthToLocal[currentFormateDate.getMonth()]} {time}
    </>
  );
};

export default DateSchedule;
