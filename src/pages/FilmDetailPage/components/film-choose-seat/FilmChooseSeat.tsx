import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import st from './FilmChooseSeat.module.scss';
import { ScheduleState } from '../../types/ScheduleState';
import { useGetSсheduleByidQuery } from '@/services/film-sevice';
import { useCurrentTime } from './hooks/useCurrentTime';
import { EnumHallName, IChoosePlace, ISelectSeat } from '@/shared/types';
import { Button, ChoosesSeats, DateSchedule } from '@/ui';
import { DesktopSeats } from '@/components/DesktopSeats';
import { MobileSeats } from '@/components/MobileSeats';

interface FilmChooseSeatProps {
  schedule: ScheduleState;
  chooseSeats: IChoosePlace[];
  onSeatClick: (seat: IChoosePlace) => void;
  onSeatSelect: (prevSeat: ISelectSeat, seat: IChoosePlace) => void;
  deleteSeat: (seat: ISelectSeat) => void;
  clearChooseSeats: () => void;
  onOpenBuy: () => void;
}

const FilmChooseSeat: FC<FilmChooseSeatProps> = ({
  schedule,
  chooseSeats,
  onSeatClick,
  clearChooseSeats,
  onOpenBuy,
  onSeatSelect,
  deleteSeat,
}) => {
  const params = useParams<{ id: string }>();
  const { data } = useGetSсheduleByidQuery(params?.id || '');

  const currentTime = useCurrentTime(data?.schedules, schedule);

  useEffect(() => {
    clearChooseSeats();
  }, [schedule]);

  return (
    <div className={`container ${st.choose}`}>
      <h2>Выбор места</h2>
      {schedule.time && (
        <div className={st.choose__body}>
          {currentTime && (
            <>
              <DesktopSeats
                chooseSeats={chooseSeats}
                onSeatClick={onSeatClick}
                places={currentTime.hall.places}
                className={st.choose__seats}
              />
              <MobileSeats
                chooseSeats={chooseSeats}
                onSeatSelect={onSeatSelect}
                deleteSeat={deleteSeat}
                places={currentTime.hall.places}
                className={st.choose__seats}
              />
            </>
          )}

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
                <DateSchedule
                  date={schedule.date}
                  time={currentTime?.time || ''}
                />
              </div>
            </div>
            <div className={st.choose__item}>
              <div className={st.choose__txt}>Места</div>
              <div className={st.choose__txt_value}>
                <ChoosesSeats
                  seats={chooseSeats}
                  rowClassName={st.choose__row}
                />
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
