import { FC, useEffect } from 'react';

import st from './FilmChooseSeat.module.scss';
import { ScheduleState } from '../../types/ScheduleState';
import { useGetSсheduleByidQuery } from '@/services/film-sevice';
import { useParams } from 'react-router-dom';
import { Seats } from '@/components/Seats';
import { useCurrentTime } from './hooks/useCurrentTime';
import { useChoose } from './hooks/useChoose';

interface FilmChooseSeatProps {
  schedule: ScheduleState;
}

const FilmChooseSeat: FC<FilmChooseSeatProps> = ({ schedule }) => {
  const params = useParams<{ id: string }>();
  const { data } = useGetSсheduleByidQuery(params?.id || '');

  const currentTime = useCurrentTime(data?.schedules, schedule);
  const { chooseSeats, onSeatClick, clearChooseSeats } = useChoose();

  useEffect(() => {
    clearChooseSeats();
  }, [schedule]);

  return (
    <div className={`container ${st.choose}`}>
      <h2>Выбор места</h2>
      <div className={st.choose__body}>
        <div className={st.choose__seat}>
          <div className={st.choose__screen}>
            <div className={`${st.choose__txt} ${st.choose__txt_screen}`}>
              Экран
            </div>
            <div className={st.choose__screen_icon}></div>
          </div>

          {currentTime && (
            <Seats
              chooseSeats={chooseSeats}
              onSeatClick={onSeatClick}
              places={currentTime.hall.places}
              className={st.choose__seats}
            />
          )}
        </div>
        <div className={st.choose__info}></div>
      </div>
    </div>
  );
};

export default FilmChooseSeat;
