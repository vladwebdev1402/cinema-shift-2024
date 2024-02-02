import { useParams } from 'react-router-dom';
import { FC, useState } from 'react';

import { Modal } from '@/ui';
import { FormCardValues, FormQuestionnaireValues } from './types/form';
import QuestionnaireForm from './QuestionnaireForm';
import CardForm from './CardForm';
import { usePayTicketMutation } from '@/services/film-sevice';
import { ScheduleState } from '../../types/ScheduleState';
import { IChoosePlace } from '@/shared/types';

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

  return (
    <Modal
      onClose={() => onCloseBuy()}
      title={
        isPayment ? 'Введите данные карты для оплаты' : 'Введите ваши даные'
      }
    >
      {!isPayment && (
        <QuestionnaireForm
          saveQuestionnaire={saveQuestionnaire}
          questionnaire={questionnaire}
        />
      )}
      {isPayment && (
        <CardForm returnToQuestionnaire={returnToQuestionnaire} onPay={onPay} />
      )}
    </Modal>
  );
};

export default FilmBuyTicket;
