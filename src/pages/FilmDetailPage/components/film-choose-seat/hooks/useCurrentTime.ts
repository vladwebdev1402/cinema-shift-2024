import { useMemo } from 'react';
import { ISchedule } from '@/shared/types';
import { ScheduleState } from '../../../types/ScheduleState';

export const useCurrentTime = (
  schedules: ISchedule[] | undefined,
  currentSchedule: ScheduleState,
) => {
    console.log("@ useCurrentTime");
  const currentSeanse = useMemo(() => {
    if (schedules)
      return schedules.find((seanse) => seanse.date === currentSchedule.date);
    return undefined;
  }, [schedules, currentSchedule.date]);

  const currentHall = useMemo(() => {
    if (currentSeanse)
      return currentSeanse.seances.filter(
        (seanse) => seanse.hall.name === currentSchedule.hall,
      );
    return undefined;
  }, [currentSeanse, currentSchedule.hall]);

  const currentTime = useMemo(() => {
    if (currentHall)
      return currentHall.find((hall) => hall.time === currentSchedule.time);
    return undefined;
  }, [currentHall, currentSchedule.time]);

  return currentTime;
};
