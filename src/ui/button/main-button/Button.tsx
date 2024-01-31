import React, { FC } from 'react';
import classNames from 'classnames';
import st from './Button.module.scss';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  fullWidth?: boolean;
  StartIcon?: React.ReactNode;
}

const Button: FC<Props> = ({
  variant = 'contained',
  className = '',
  onClick,
  children,
  StartIcon,
  fullWidth,
  ...props
}) => {
  const btnClasses = classNames(className, st.button, {
    [st.button_contained]: variant === 'contained',
    [st.button_outlined]: variant === 'outlined',
    [st.button_text]: variant === 'text',
    [st.button_fullWidth]: fullWidth,
  });

  return (
    <button className={btnClasses} onClick={onClick} {...props}>
      {StartIcon && <div className={st.button__icon}>{StartIcon}</div>}
      {children}
    </button>
  );
};

export default Button;
