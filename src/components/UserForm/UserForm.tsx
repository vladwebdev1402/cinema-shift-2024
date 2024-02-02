import { useForm } from 'react-hook-form';
import { FC } from 'react';

import st from './UserForm.module.scss';
import { Button, Input } from '@/ui';
import { onChangeWithRegexp } from '@/shared/utils';
import { IUser } from '@/shared/types/IUser';

interface UserFormProps {
  handleUserSubmit: (value: IUser) => void;
  user: IUser;
  buttonText?: string;
  disablePhone?: boolean;
}

const UserForm: FC<UserFormProps> = ({
  handleUserSubmit,
  user,
  disablePhone = false,
  buttonText = 'Продолжить',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IUser>({ defaultValues: { ...user } });

  const onSubmit = handleSubmit((data) => handleUserSubmit(data));

  return (
    <form onSubmit={onSubmit}>
      <Input
        label='Имя*'
        fullWidth
        placeholder='Иван'
        {...register('firstname', {
          pattern: {
            value:
              /^(?:[А-Яа-я `'-]{1,60}[А-Яа-я]|[A-Za-z `'-]{1,60}[A-Za-z])$/,
            message:
              'Значение должно быть задано с использованием одного из следующих алфавитов:\
                кириллического, латинского. И не должно оканчиваться на спецсимвол',
          },
          required: 'Поле необходимо обязательно заполнить',
        })}
        onChange={onChangeWithRegexp(/^[A-Za-zА-Яа-я `'-]{0,60}$/, (value) =>
          setValue('firstname', value),
        )}
        value={watch('firstname')}
        isError={!!errors.firstname}
        errorMessage={errors.firstname?.message || ''}
      />
      <Input
        label='Фамилия*'
        fullWidth
        placeholder='Иванов'
        className={st.form__item}
        {...register('lastname', {
          pattern: {
            value:
              /^(?:[А-Яа-я `'-]{1,60}[А-Яа-я]|[A-Za-z `'-]{1,60}[A-Za-z])$/,
            message:
              'Значение должно быть задано с использованием одного из следующих алфавитов:\
                кириллического, латинского. И не должно оканчиваться на спецсимвол',
          },
          required: 'Поле необходимо обязательно заполнить',
        })}
        onChange={onChangeWithRegexp(/^[A-Za-zА-Яа-я `'-]{0,60}$/, (value) =>
          setValue('lastname', value),
        )}
        value={watch('lastname')}
        isError={!!errors.lastname}
        errorMessage={errors.lastname?.message || ''}
      />
      <Input
        label='Отчество'
        fullWidth
        placeholder='Иванович'
        className={st.form__item}
        {...register('middlename', {
          pattern: {
            value:
              /^(?:[А-Яа-я `'-]{1,60}[А-Яа-я]|[A-Za-z `'-]{1,60}[A-Za-z])$/,
            message:
              'Значение должно быть задано с использованием одного из следующих алфавитов:\
              кириллического, латинского. И не должно оканчиваться на спецсимвол',
          },
        })}
        onChange={onChangeWithRegexp(/^[A-Za-zА-Яа-я `'-]{0,60}$/, (value) =>
          setValue('middlename', value),
        )}
        value={watch('middlename')}
        isError={!!errors.middlename}
        errorMessage={errors.middlename?.message || ''}
      />
      <Input
        label='Телефон*'
        fullWidth
        placeholder='89009009090'
        className={st.form__item}
        {...register('phone', {
          pattern: {
            value: /^(7|8)\d{10}$/,
            message: 'Введите номер телефона в формате 8XXXYYYZZTT',
          },
          required: 'Поле необходимо обязательно заполнить',
        })}
        onChange={onChangeWithRegexp(/^[0-9]{0,11}$/, (value) =>
          setValue('phone', value),
        )}
        value={watch('phone')}
        isError={!!errors.phone}
        errorMessage={errors.phone?.message || ''}
        disabled={disablePhone}
      />
      <Button type='submit' fullWidth className={st.form__item}>
        {buttonText}
      </Button>
    </form>
  );
};

export default UserForm;
