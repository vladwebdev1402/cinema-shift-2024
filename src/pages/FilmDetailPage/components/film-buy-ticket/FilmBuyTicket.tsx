import { FC, useState } from 'react';
import { Modal } from '@/ui';
import { FormQuestionnaireValues } from './types/form';
import QuestionnaireForm from './QuestionnaireForm';
import CardForm from './CardForm';

interface FilmBuyTicketProps {
  onCloseBuy: () => void;
}

const FilmBuyTicket: FC<FilmBuyTicketProps> = ({ onCloseBuy }) => {
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
    console.log(123);
    setIsPayment(false);
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
      {isPayment && <CardForm returnToQuestionnaire={returnToQuestionnaire} />}
    </Modal>
  );
};

export default FilmBuyTicket;
