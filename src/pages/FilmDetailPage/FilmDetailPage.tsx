import { useParams } from 'react-router-dom';

import { useGetSheduleByidQuery } from '@/services/film-sevice';
import { useEffect, useState } from 'react';
import { IScheduleState } from '@/shared/types';
import { FilmFullDescription } from './components/film-full-description';
import { FilmSchedule } from './components/film-schedule';

const FilmDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetSheduleByidQuery(params?.id || '');
  const [schedule, setSchedule] = useState<IScheduleState>({
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

  const onClickTime = (time: string) => {
    setSchedule({
      ...schedule,
      time,
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
    </>
  );
};

export default FilmDetailPage;
