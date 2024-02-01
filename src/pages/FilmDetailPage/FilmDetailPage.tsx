import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useGetSсheduleByidQuery } from '@/services/film-sevice';
import { FilmFullDescription } from './components/film-full-description';
import { FilmSchedule } from './components/film-schedule';
import { FilmChooseSeat } from './components/film-choose-seat';
import { useChoose } from './hooks/useChoose';
import { useSchedule } from './hooks/useSchedule';

const FilmDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetSсheduleByidQuery(params?.id || '');
  const { chooseSeats, onSeatClick, clearChooseSeats } = useChoose();
  const { schedule, onClickDate, onClickTime } = useSchedule(data?.schedules);
  const [isBuyOpen, setIsBuyOpen] = useState(false);

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
      <FilmChooseSeat
        schedule={schedule}
        chooseSeats={chooseSeats}
        onSeatClick={onSeatClick}
        clearChooseSeats={clearChooseSeats}
      />
    </>
  );
};

export default FilmDetailPage;
