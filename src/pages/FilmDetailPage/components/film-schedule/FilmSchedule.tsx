import { FC, useMemo } from 'react';

import st from './FilmSchedule.module.scss';
import { ISchedule, IScheduleState } from '@/shared/types';
import { Tab, TabsGroup } from '@/ui';
import { groupByHall } from './utils/groupByHall';
import HallTimes from './HallTimes';
import { calcDate } from './utils/calcDate';
import ScheduleSkeletons from './ScheduleSkeletons';

interface Props {
  schedules: ISchedule[] | undefined;
  isLoading: boolean;
  isError: boolean;
  schedule: IScheduleState;
  setSchedule: (value: IScheduleState) => void;
}

const FilmSchedule: FC<Props> = ({
  schedules,
  isError,
  isLoading,
  schedule,
  setSchedule,
}) => {
  const tabDateClick = (value: string) => {
    setSchedule({ ...schedule, date: value });
  };

  const currentSeans = useMemo(() => {
    return (
      schedules?.filter((arrShedule) => arrShedule.date === schedule.date)[0]
        ?.seances ?? undefined
    );
  }, [schedule.date]);

  const groupedSeances = useMemo(() => {
    if (currentSeans) return groupByHall(currentSeans);
    else return undefined;
  }, [currentSeans]);

  if (isError) return <></>;

  return (
    <div className={`container ${st.schedule}`}>
      <h2>Расписание</h2>
      <TabsGroup className={st.schedule__item}>
        {schedules &&
          schedules.map((arrSchedule) => {
            const { day, dayWeek, month } = calcDate(arrSchedule.date);
            return (
              <Tab
                active={arrSchedule.date === schedule.date}
                onClick={() => tabDateClick(arrSchedule.date)}
                key={arrSchedule.date}
              >
                {dayWeek}, {day} {month}
              </Tab>
            );
          })}
      </TabsGroup>
      {groupedSeances &&
        groupedSeances.map((hall) => (
          <HallTimes
            key={hall.name}
            hall={hall}
            schedule={schedule}
            setSchedule={setSchedule}
          />
        ))}
      {isLoading && <ScheduleSkeletons />}
    </div>
  );
};

export default FilmSchedule;
