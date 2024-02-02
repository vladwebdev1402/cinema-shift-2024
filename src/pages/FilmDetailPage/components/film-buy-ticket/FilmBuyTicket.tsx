import { useParams } from 'react-router-dom';
import { FC, useState } from 'react';

import st from './FilmBuyTicket.module.scss';
import { Modal } from '@/ui';
import { FormCardValues } from './types/form';
import CardForm from './CardForm';
import { usePayTicketMutation } from '@/services/film-sevice';
import { ScheduleState } from '../../types/ScheduleState';
import { IChoosePlace } from '@/shared/types';
import OrderInfo from './OrderInfo';
import { IUser } from '@/shared/types/IUser';
import { UserForm } from '@/components/UserForm';
import { useAppSelector } from '@/shared/hooks';

interface FilmBuyTicketProps {
  onCloseBuy: () => void;
  schedule: ScheduleState;
  chooseSeats: IChoosePlace[];
}

const FilmBuyTicket: FC<FilmBuyTicketProps> = ({
  schedule,
  chooseSeats,
  onCloseBuy,
}) => {
  const params = useParams<{ id: string }>();
  const [payTicket, { isLoading, isSuccess, data }] = usePayTicketMutation();
  const { user } = useAppSelector((state) => state.UserReducer);

  const [isPayment, setIsPayment] = useState(false);
  const [questionnaire, setQuestionnaire] = useState<IUser>(
    user || {
      firstname: '',
      lastname: '',
      middlename: '',
      phone: '',
    },
  );

  const saveQuestionnaire = (data: IUser) => {
    setQuestionnaire(data);
    setIsPayment(true);
  };

  const returnToQuestionnaire = () => {
    setIsPayment(false);
  };

  const onPay = (cardData: FormCardValues) => {
    payTicket({
      filmId: params?.id || '',
      debitCard: { ...cardData },
      person: {
        ...questionnaire,
      },
      seance: { ...schedule },
      tickets: chooseSeats,
    });
  };

  if (isSuccess && data)
    return (
      <Modal onClose={() => onCloseBuy()} className={st.modal__info}>
        <OrderInfo order={data.order} schedule={schedule} />
      </Modal>
    );

  if (isPayment)
    return (
      <Modal
        onClose={() => onCloseBuy()}
        title='Введите данные карты для оплаты'
      >
        <CardForm
          returnToQuestionnaire={returnToQuestionnaire}
          onPay={onPay}
          isLoading={isLoading}
        />
      </Modal>
    );

  if (!isPayment)
    return (
      <Modal onClose={() => onCloseBuy()} title='Введите ваши даные'>
        <UserForm handleUserSubmit={saveQuestionnaire} user={questionnaire} />
      </Modal>
    );
};

export default FilmBuyTicket;
