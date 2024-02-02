import { ComponentPropsWithoutRef, FC, LegacyRef, forwardRef } from 'react';
import st from './Input.module.scss';
import classNames from 'classnames';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  hint?: string;
  errorMessage?: string;
  isError?: boolean;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = forwardRef(
  (
    {
      label = '',
      hint = '',
      errorMessage = '',
      isError = false,
      className = '',
      fullWidth = false,
      ...props
    },
    myRef,
  ) => {
    const inputClasses = classNames(className, st.input, {
      [st.input_fullWidth]: fullWidth,
      [st.input_error]: isError,
    });

    return (
      <label className={inputClasses}>
        <span className={st.input__label}>{label}</span>
        <input {...props} ref={myRef as LegacyRef<HTMLInputElement>} />
        <span className={st.input__hint}>{isError ? errorMessage : hint}</span>
      </label>
    );
  },
);

export default Input;
