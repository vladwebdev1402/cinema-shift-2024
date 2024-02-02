import { useForm } from 'react-hook-form';

import st from './Auth.module.scss';
import { Button, Input } from '@/ui';
import { onChangeWithRegexp } from '@/shared/utils';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { authByCode, fetchCode } from '@/services/auth-slice';

interface AuthForm {
  phone: string;
  code: string;
}

const AuthByPhone = () => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>();

  const { code, isLoading } = useAppSelector((state) => state.UserReducer);

  const onSubmit = handleSubmit((data) => {
    if (!code) dispatch(fetchCode(data.phone));
    if (code)
      dispatch(
        authByCode({
          code: Number(data.code),
          phone: data.phone,
        }),
      );
  });

  const dispatch = useAppDispatch();

  return (
    <div className={`container ${st.auth}`}>
      <div className={st.auth__body}>
        <h2>Авторизация</h2>
        <div className={st.auth__item}>
          Введите номер телефона для входа в личный кабинет
        </div>
        <form onSubmit={onSubmit} className={st.auth__item}>
          <Input
            fullWidth
            placeholder='Телефон'
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
          />
          {code && (
            <Input
              className={st.auth__item}
              fullWidth
              placeholder='Введите шестизначный код'
              {...register('code', {
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Код состоит из цифр',
                },
                required: 'Поле необходимо обязательно заполнить',
                minLength: {
                  value: 6,
                  message: 'Введите шестизначный код',
                },
              })}
              onChange={onChangeWithRegexp(/^[0-9]{0,6}$/, (value) =>
                setValue('code', value),
              )}
              value={watch('code')}
              isError={!!errors.code}
              errorMessage={errors.code?.message || ''}
            />
          )}
          <Button
            className={`${st.auth__item} ${st.auth__btn}`}
            fullWidth
            loading={isLoading}
            type='submit'
          >
            {code ? 'Авторизоваться' : 'Продолжить'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthByPhone;
