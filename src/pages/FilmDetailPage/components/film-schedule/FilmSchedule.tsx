import { FC, useMemo } from 'react';

import st from './FilmSchedule.module.scss';
import { Tab, TabsGroup } from '@/ui';
import { groupByHall } from './utils/groupByHall';
import HallTimes from './HallTimes';
import { calcDate } from './utils/calcDate';
import ScheduleSkeletons from './ScheduleSkeletons';
import { useGetSheduleByidQuery } from '@/services/film-sevice';
import { useParams } from 'react-router-dom';
import { ScheduleState } from '../../types/ScheduleState';

interface Props {
  schedule: ScheduleState;
  onClickDate: (value: string) => void;
  onClickTime: (value: string) => void;
}

const FilmSchedule: FC<Props> = ({ schedule, onClickDate, onClickTime }) => {
  const params = useParams<{ id: string }>();

  const { data, isError, isLoading } = useGetSheduleByidQuery(params?.id || '');

  const tabDateClick = (value: string) => onClickDate(value);

  const currentSeans = useMemo(() => {
    return (
      data?.schedules.find((arrShedule) => arrShedule.date === schedule.date)
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
        {data &&
          data.schedules.map((arrSchedule) => {
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
            onClickTime={onClickTime}
          />
        ))}
      {isLoading && <ScheduleSkeletons />}
    </div>
  );
};

export default FilmSchedule;
