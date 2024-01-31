import { FC, useEffect, useMemo, useState } from 'react';

import st from './FilmChooseSeat.module.scss';
import { ScheduleState } from '../../types/ScheduleState';
import { useGetSсheduleByidQuery } from '@/services/film-sevice';
import { useParams } from 'react-router-dom';
import { Seats } from '@/components/Seats';
import { IChoosePlace } from '@/shared/types';

interface FilmChooseSeatProps {
  schedule: ScheduleState;
}

const FilmChooseSeat: FC<FilmChooseSeatProps> = ({ schedule }) => {
  const [chooseSeats, setChooseSeats] = useState<IChoosePlace[]>([]);

  const params = useParams<{ id: string }>();
  const { data } = useGetSсheduleByidQuery(params?.id || '');

  const currentSeanse = useMemo(() => {
    if (data)
      return data.schedules.find((seanse) => seanse.date === schedule.date);
    return undefined;
  }, [data, schedule.date]);

  const currentHall = useMemo(() => {
    if (currentSeanse)
      return currentSeanse.seances.filter(
        (seanse) => seanse.hall.name === schedule.hall,
      );
    return undefined;
  }, [currentSeanse, schedule.hall]);

  const currentTime = useMemo(() => {
    if (currentHall)
      return currentHall.find((hall) => hall.time === schedule.time);
    return undefined;
  }, [currentHall, schedule.time]);

  const onSeatClick = (seat: IChoosePlace) => {
    const currentSeat = chooseSeats.find(
      (arrSeat) => arrSeat.row === seat.row && arrSeat.column === seat.column,
    );

    if (currentSeat)
      setChooseSeats(
        chooseSeats.filter(
          (arrSeat) =>
            arrSeat.row !== seat.row || arrSeat.column !== seat.column,
        ),
      );
    else setChooseSeats([...chooseSeats, seat]);
  };

  useEffect(() => {
    setChooseSeats([]);
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
