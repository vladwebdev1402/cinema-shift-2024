import { FC } from 'react';

import st from './FilmBuyTicket.module.scss';
import { Button, Input } from '@/ui';
import { useForm } from 'react-hook-form';
import { FormCardValues } from './types/form';
import { onChangeWithRegexp } from '@/shared/utils';

interface CardForm {
  returnToQuestionnaire: () => void;
  onPay: (data: FormCardValues) => void;
}

const CardForm: FC<CardForm> = ({ returnToQuestionnaire, onPay }) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormCardValues>();

  const onSubmit = handleSubmit((data) => onPay(data));

  return (
    <form onSubmit={onSubmit} className={st.card__form}>
      <div className={st.card}>
        <Input
          label='Номер*'
          fullWidth
          placeholder='88884444'
          {...register('pan', {
            required: 'Поле необходимо обязательно заполнить',
            minLength: {
              value: 8,
              message: 'Длина номера карты равна 8 символам',
            },
          })}
          value={watch('pan')}
          onChange={onChangeWithRegexp(/^[0-9]{0,8}$/, (value) =>
            setValue('pan', value),
          )}
          isError={!!errors.pan}
          errorMessage={errors.pan?.message || ''}
        />
        <div className={st.card__bottom}>
          <Input
            label='Срок*'
            fullWidth
            placeholder='00/00'
            {...register('expireDate', {
              required: 'Обязательное поле',
              pattern: {
                value: /^(?:[0][0-9]|[1][0-2])\/[0-9][0-9]$/,
                message: 'Введите месяц и год в формате 00/00',
              },
            })}
            value={watch('expireDate')}
            onChange={onChangeWithRegexp(/^[0-9/]{0,5}$/, (value) =>
              setValue('expireDate', value),
            )}
            isError={!!errors.expireDate}
            errorMessage={errors.expireDate?.message || ''}
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
