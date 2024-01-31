import { FC } from 'react';

import st from './Tab.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: 'contained' | 'outlined';
  withBorder?: boolean;
}

const Tab: FC<Props> = ({
  children,
  className,
  active = false,
  withBorder = false,
  variant = 'contained',
  ...props
}) => {
  return (
    <button
      className={[
        className,
        st.tab,
        active && variant === 'contained' ? st.tab_contained_active : '',
        active && variant === 'outlined' ? st.tab_outlined_active : '',
        variant === 'contained' ? st.tab_contained : '',
        variant === 'outlined' ? st.tab_outlined : '',
      ].join(' ')}
      {...props}
    >
      <div className={`${withBorder ? st.tab_border : ''} ${st.tab__body}`}>
        {children}
      </div>
    </button>
  );
};

export default Tab;
