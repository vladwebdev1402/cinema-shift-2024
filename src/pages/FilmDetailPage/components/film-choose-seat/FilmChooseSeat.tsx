import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import st from './FilmChooseSeat.module.scss';
import { ScheduleState } from '../../types/ScheduleState';
import { useGetSсheduleByidQuery } from '@/services/film-sevice';
import { Seats } from '@/components/Seats';
import { useCurrentTime } from './hooks/useCurrentTime';
import { EnumHallName, IChoosePlace, monthToLocal } from '@/shared/types';
import { groupedSeatsByRow } from './utils/groupedSeatsByRow';
import { formateDate } from '@/shared/utils';
import { Button } from '@/ui';

interface FilmChooseSeatProps {
  schedule: ScheduleState;
  chooseSeats: IChoosePlace[];
  onSeatClick: (seat: IChoosePlace) => void;
  clearChooseSeats: () => void;
  onOpenBuy: () => void;
}

const FilmChooseSeat: FC<FilmChooseSeatProps> = ({
  schedule,
  chooseSeats,
  onSeatClick,
  clearChooseSeats,
  onOpenBuy,
}) => {
  const params = useParams<{ id: string }>();
  const { data } = useGetSсheduleByidQuery(params?.id || '');

  const currentTime = useCurrentTime(data?.schedules, schedule);

  const groupedChooseSeats = groupedSeatsByRow(chooseSeats);
  const currentFormateDate = useMemo(() => {
    return formateDate(schedule.date);
  }, [schedule.date]);

  useEffect(() => {
    clearChooseSeats();
  }, [schedule]);

  return (
    <div className={`container ${st.choose}`}>
      <h2>Выбор места</h2>
      {schedule.time && (
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
          <div className={st.choose__info}>
            <div className={st.choose__item}>
              <div className={st.choose__txt}>Зал</div>
              <div className={st.choose__txt_value}>
                {schedule.hall && EnumHallName[schedule.hall]}
              </div>
            </div>
            <div className={st.choose__item}>
              <div className={st.choose__txt}>Дата и время</div>
              <div className={st.choose__txt_value}>
                {currentFormateDate.getDate()}{' '}
                {monthToLocal[currentFormateDate.getMonth()]}{' '}
                {currentTime?.time || ''}
              </div>
            </div>
            <div className={st.choose__item}>
              <div className={st.choose__txt}>Места</div>
              <div className={st.choose__txt_value}>
                {groupedChooseSeats
                  .sort((a, b) => a.row - b.row)
                  .map((seats) => (
                    <div key={seats.row} className={st.choose__row}>
                      Ряд {seats.row} -
                      {seats.columns.map((column, idx) => (
                        <>
                          {column}
                          {idx !== seats.columns.length - 1 && ','}
                        </>
                      ))}
                    </div>
                  ))}
                {groupedChooseSeats.length === 0 && 'Выберите место'}
              </div>
            </div>
            <div className={st.choose__item}>
              <h3>
                Сумма: {chooseSeats.reduce((acc, seat) => acc + seat.price, 0)}
              </h3>
            </div>
            <Button
              className={`${st.choose__item} ${st.choose__btn}`}
              fullWidth
              onClick={() => onOpenBuy()}
              disabled={chooseSeats.length === 0}
            >
              Купить
            </Button>
          </div>
        </div>
      )}
      {!schedule.time && (
        <h3 className={st.choose__error}>
          Выберите время сеанса для просмотра доступных мест
        </h3>
      )}
    </div>
  );
};

export default FilmChooseSeat;
