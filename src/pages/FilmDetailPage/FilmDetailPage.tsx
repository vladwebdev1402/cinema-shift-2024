import { useParams } from 'react-router-dom';

import { FilmFullDescription } from '@/components/FilmCard';
import { useGetSheduleByidQuery } from '@/services/film-sevice';
import { FilmSchedule } from '@/modules/film-schedule';
import { useEffect, useState } from 'react';
import { IScheduleState } from '@/shared/types';

const FilmDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data, isError, isLoading } = useGetSheduleByidQuery(params?.id || '');
  const [schedule, setSchedule] = useState<IScheduleState>({
    date: '',
    time: '',
    hall: '',
  });

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
        schedules={data?.schedules}
        isError={isError}
        isLoading={isLoading}
        schedule={schedule}
        setSchedule={setSchedule}
      />
    </>
  );
};

export default FilmDetailPage;
