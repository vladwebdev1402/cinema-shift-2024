import { FC } from 'react';

import st from './FilmBuyTicket.module.scss';
import { Button, Input } from '@/ui';
import { useForm } from 'react-hook-form';
import { FormCardValues } from './types/form';
import { onChangeWithRegexp } from '@/shared/utils';

interface CardForm {
  returnToQuestionnaire: () => void;
}

const CardForm: FC<CardForm> = ({ returnToQuestionnaire }) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormCardValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit} className={st.card__form}>
      <div className={st.card}>
        <Input
          label='Номер*'
          fullWidth
          placeholder='88884444'
          {...register('number', {
            required: 'Поле необходимо обязательно заполнить',
            minLength: {
              value: 8,
              message: 'Длина номера карты равна 8 символам',
            },
          })}
          value={watch('number')}
          onChange={onChangeWithRegexp(/^[0-9]{0,8}$/, (value) =>
            setValue('number', value),
          )}
          isError={!!errors.number}
          errorMessage={errors.number?.message || ''}
        />
        <div className={st.card__bottom}>
          <Input
            label='Срок*'
            fullWidth
            placeholder='00/00'
            {...register('date', {
              required: 'Обязательное поле',
              pattern: {
                value: /^(?:[0][0-9]|[1][0-2])\/[0-9][0-9]$/,
                message: 'Введите месяц и год в формате 00/00',
              },
            })}
            value={watch('date')}
            onChange={onChangeWithRegexp(/^[0-9/]{0,5}$/, (value) =>
              setValue('date', value),
            )}
            isError={!!errors.date}
            errorMessage={errors.date?.message || ''}
          />
          <Input
            label='CVV*'
            fullWidth
            placeholder='000'
            {...register('cvv', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Длина CVV равна 3 символам',
              },
            })}
            value={watch('cvv')}
            onChange={onChangeWithRegexp(/^[0-9]{0,3}$/, (value) =>
              setValue('cvv', value),
            )}
            isError={!!errors.cvv}
            errorMessage={errors.cvv?.message || ''}
          />
        </div>
      </div>
      <Button type='submit' fullWidth className={st.card__buy}>
        Оплатить
      </Button>
      <Button variant='text' onClick={returnToQuestionnaire} fullWidth>
        Вернуться назад
      </Button>
    </form>
  );
};

export default CardForm;
