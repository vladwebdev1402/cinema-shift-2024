import { FC } from 'react';

import st from './FilmSchedule.module.scss';
import { IGroupedHalls } from './utils/groupByHall';
import { EnumHallName, THallName } from '@/shared/types';
import { Tab, TabsGroup } from '@/ui';
import { ScheduleState } from '../../types/ScheduleState';

interface Props {
  hall: IGroupedHalls;
  schedule: ScheduleState;
  onClickTime: (time: string, hall: THallName) => void;
}

const HallTimes: FC<Props> = ({ hall, schedule, onClickTime }) => {
  const timeClick = (time: string) => onClickTime(time, hall.name);

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
