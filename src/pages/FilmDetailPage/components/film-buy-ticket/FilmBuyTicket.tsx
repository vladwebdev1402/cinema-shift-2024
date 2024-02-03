import { useParams } from 'react-router-dom';
import { FC, useState } from 'react';

import st from './FilmBuyTicket.module.scss';
import { Modal } from '@/ui';
import { FormCardValues, FormQuestionnaireValues } from './types/form';
import QuestionnaireForm from './QuestionnaireForm';
import CardForm from './CardForm';
import { usePayTicketMutation } from '@/services/film-sevice';
import { ScheduleState } from '../../types/ScheduleState';
import { IChoosePlace } from '@/shared/types';
import OrderInfo from './OrderInfo';

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

  const [isPayment, setIsPayment] = useState(false);
  const [questionnaire, setQuestionnaire] = useState<FormQuestionnaireValues>({
    firstname: '',
    lastname: '',
    middlename: '',
    phone: '',
  });

  const saveQuestionnaire = (data: FormQuestionnaireValues) => {
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
        <QuestionnaireForm
          saveQuestionnaire={saveQuestionnaire}
          questionnaire={questionnaire}
        />
      </Modal>
    );
};

export default FilmBuyTicket;
