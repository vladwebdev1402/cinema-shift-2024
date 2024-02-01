import { ComponentProps, FC } from 'react';
import st from './Input.module.scss';
import classNames from 'classnames';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = ({
  label = '',
  className = '',
  fullWidth = false,
  ...props
}) => {
  const inputClasses = classNames(className, st.input, {
    [st.input_fullWidth]: fullWidth,
  });

  return (
    <label className={inputClasses}>
      <span className={st.input__label}>{label}</span>
      <input {...props} />
    </label>
  );
};

export default Input;
