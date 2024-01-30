import React, { FC } from 'react';
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
  return (
    <button
      className={`${className} ${st.button} 
      ${variant === 'contained' ? st.button_contained : ''}
       ${variant === 'outlined' ? st.button_outlined : ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
