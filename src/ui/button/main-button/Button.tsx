import React, { FC } from 'react';
import classNames from 'classnames';
import st from './Button.module.scss';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined';
}

const Button: FC<Props> = ({
  variant = 'contained',
  className = '',
  onClick,
  children,
  ...props
}) => {
  const btnClasses = classNames(className, st.button, {
    [st.button_contained]: variant === 'contained',
    [st.button_outlined]: variant === 'outlined',
  });

  return (
    <button className={btnClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
