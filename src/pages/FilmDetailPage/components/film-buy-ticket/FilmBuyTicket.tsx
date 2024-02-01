import { FC } from 'react';
import st from './FilmBuyTicket.module.scss';
import { Button, Input, Modal } from '@/ui';

interface FilmBuyTicketProps {
  onCloseBuy: () => void;
}

const FilmBuyTicket: FC<FilmBuyTicketProps> = ({ onCloseBuy }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal onClose={() => onCloseBuy()} title='Введите ваши даные'>
      <form onSubmit={onSubmit}>
        <Input label='Имя*' fullWidth placeholder='Иван' />
        <Input
          label='Фамилия*'
          fullWidth
          placeholder='Иванов'
          className={st.buy__input}
        />
        <Input
          label='Отчество'
          fullWidth
          placeholder='Иванович'
          className={st.buy__input}
        />
        <Input
          label='Телефон*'
          fullWidth
          placeholder='89009009090'
          className={st.buy__input}
        />
        <Button type='submit' fullWidth className={st.buy__btn}>
          Продолжить
        </Button>
      </form>
    </Modal>
  );
};

export default FilmBuyTicket;
