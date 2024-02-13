import { Button, Modal, Select } from '@/ui';
import { FC, useState } from 'react';
import st from './MobileSeats.module.scss';
import { IChoosePlace, IPlace, ISelectSeat } from '@/shared/types';
import ArrowRightIcon from '@/shared/assets/arrow-right.svg?react';
import BaskettIcon from '@/shared/assets/basket.svg?react';
import { checkSeatInChooses } from '@/shared/utils';
interface SeatProps {
  places: IPlace[][];
  onSeatSelect: (prevSeat: ISelectSeat, seat: IChoosePlace) => void;
  deleteSeat: (seat: ISelectSeat) => void;
  showAdd: () => void;
  chooseSeats: IChoosePlace[];
  seatNumber: number;
  row?: number;
  column?: number;
}

const Seat: FC<SeatProps> = ({
  places,
  chooseSeats,
  deleteSeat,
  showAdd,
  onSeatSelect,
  seatNumber,
  row = null,
  column = null,
}) => {
  const [seat, setSeat] = useState<ISelectSeat>({
    row,
    column,
  });

  const [isOpenRow, setIsOpenRow] = useState(false);
  const [isOpenColumn, setIsOpenColumn] = useState(false);

  const onRowChoose = (value: number) => {
    deleteSeat(seat);
    setSeat({ column: null, row: value });
    setIsOpenRow(false);
    setIsOpenColumn(true);
  };

  const onColumnChoose = (value: number, price: number) => {
    onSeatSelect(seat, { row: seat.row!, column: value, price });
    setSeat({ ...seat, column: value });
    setIsOpenColumn(false);
    showAdd();
  };

  return (
    <>
      <div className={st.seat}>
        <div className={st.seat__header}>
          <span>Место {seatNumber}</span>
          {seat.column !== null && seat.row !== null && (
            <Button
              className={st.seat__delete}
              variant='text'
              StartIcon={<BaskettIcon />}
              onClick={() => deleteSeat(seat)}
            />
          )}
        </div>
        <div className={st.seat__body}>
          <Select
            label='Ряд'
            placeholder='Выбрать ряд'
            currentValue={seat.row?.toString() || ''}
            onClick={() => setIsOpenRow(true)}
            handleChange={() => {}}
            className={st.seat__select}
          />
          <Select
            label='Место'
            placeholder={seat.row ? 'Выбрать место' : 'Выберите ряд'}
            currentValue={seat.column?.toString() || ''}
            onClick={() => seat.row !== null && setIsOpenColumn(true)}
            handleChange={() => {}}
            disabled={seat.row === null}
            className={st.seat__select}
          />
        </div>
      </div>
      {isOpenRow && (
        <Modal
          onClose={() => setIsOpenRow(false)}
          title='Ряд'
          className={st.seat__modal}
          bodyClassName={st.seat__modal_body}
        >
          {places.map((_, idx) => (
            <Button
              variant='text'
              key={idx}
              className={st.seat__btn}
              EndIcon={<ArrowRightIcon />}
              onClick={() => onRowChoose(idx + 1)}
            >
              Ряд {idx + 1}
            </Button>
          ))}
        </Modal>
      )}
      {isOpenColumn && (
        <Modal
          onClose={() => setIsOpenColumn(false)}
          title='Место'
          className={st.seat__modal}
          bodyClassName={st.seat__modal_body}
        >
          {places
            .find((_, idx) => idx + 1 === seat.row)
            ?.map((column, idx) => (
              <Button
                variant='text'
                key={idx}
                className={`${st.seat__btn_price}`}
                onClick={() => onColumnChoose(idx + 1, column.price)}
                disabled={
                  checkSeatInChooses(chooseSeats, seat.row || -1, idx + 1) ||
                  column.type === 'BLOCKED'
                }
              >
                {idx + 1},
                <span className={st.seat__price}>{column.price} ₽</span>
              </Button>
            ))}
        </Modal>
      )}
    </>
  );
};

export default Seat;
