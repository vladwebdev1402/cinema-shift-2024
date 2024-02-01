import { Modal } from '@/ui';
import { FC } from 'react';

interface FilmBuyTicketProps {
  onCloseBuy: () => void;
}

const FilmBuyTicket: FC<FilmBuyTicketProps> = ({ onCloseBuy }) => {
  return (
    <Modal onClose={() => onCloseBuy()} title='Введите ваши даные'></Modal>
  );
};

export default FilmBuyTicket;
