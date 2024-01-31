import { useParams } from 'react-router-dom';

import { useGetSсheduleByidQuery } from '@/services/film-sevice';
import { useEffect, useState } from 'react';
import { FilmFullDescription } from './components/film-full-description';
import { FilmSchedule } from './components/film-schedule';
import { ScheduleState } from './types/ScheduleState';
import { THallName } from '@/shared/types';
import { FilmChooseSeat } from './components/film-choose-seat';

const FilmDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetSсheduleByidQuery(params?.id || '');
  const [schedule, setSchedule] = useState<ScheduleState>({
    date: '',
    time: '',
    hall: '',
  });

  const onClickDate = (date: string) => {
    setSchedule({
      ...schedule,
      date,
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
    if (data)
      setSchedule({
        date: data.schedules[0].date,
        hall: data.schedules[0].seances[0].hall.name,
        time: data.schedules[0].seances[0].time,
      });
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <FilmFullDescription />
      <FilmSchedule
        schedule={schedule}
        onClickDate={onClickDate}
        onClickTime={onClickTime}
      />
      <FilmChooseSeat schedule={schedule} />
    </>
  );
};

export default FilmDetailPage;
