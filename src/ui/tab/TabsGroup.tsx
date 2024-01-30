import { FC } from 'react';

import st from './TabsGroup.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: 'contained' | 'outlined';
}

const TabsGroup: FC<Props> = ({
  children,
  className = '',
  variant = 'contained',
}) => {
  return (
    <div
      className={[
        className,
        st.tabs,
        variant === 'contained' ? st.tabs_cotained : '',
        variant === 'outlined' ? st.tabs_outlined : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default TabsGroup;
