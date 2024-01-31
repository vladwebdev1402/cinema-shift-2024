import { FC } from 'react';

import st from './FilmSchedule.module.scss';
import { IGroupedHalls } from '../utils/groupByHall';
import { EnumHallName, IScheduleState } from '@/shared/types';
import { Tab, TabsGroup } from '@/ui';

interface Props {
  hall: IGroupedHalls;
  schedule: IScheduleState;
  setSchedule: (value: IScheduleState) => void;
}

const HallTimes: FC<Props> = ({ hall, schedule, setSchedule }) => {
  const timeClick = (time: string) => {
    setSchedule({
      ...schedule,
      hall: hall.name,
      time: time,
    });
  };

  return (
    <div className={st.schedule__item}>
      <div className={st.schedule__hall}>{EnumHallName[hall.name]}</div>
      <TabsGroup variant='outlined' className={st.schedule__times}>
        {hall.times.map((time) => (
          <Tab
            key={time}
            variant='outlined'
            onClick={() => timeClick(time)}
            active={schedule.hall === hall.name && schedule.time === time}
          >
            {time}
          </Tab>
        ))}
      </TabsGroup>
    </div>
  );
};

export default HallTimes;
