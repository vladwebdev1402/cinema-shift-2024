import { ISchedule, THallName } from '@/shared/types';
import { useEffect, useState } from 'react';
import { ScheduleState } from '../types/ScheduleState';

export const useSchedule = (schedules: undefined | ISchedule[]) => {
  const [schedule, setSchedule] = useState<ScheduleState>({
    date: '',
    time: '',
    hall: '',
  });

  const onClickDate = (date: string) => {
    setSchedule({
      ...schedule,
      date,
      time: ""
    });
  };

  const onClickTime = (time: string, hall: THallName) => {
    setSchedule({
      ...schedule,
      time,
      hall,
    });
  };

  useEffect(() => {
    if (schedules)
      setSchedule({
        date: schedules[0].date,
        hall: schedules[0].seances[0].hall.name,
        time: schedules[0].seances[0].time,
      });
  }, [schedules]);

  return { schedule, onClickDate, onClickTime };
};
