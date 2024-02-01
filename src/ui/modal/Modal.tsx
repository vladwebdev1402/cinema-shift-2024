import { ComponentProps, FC, useEffect } from 'react';

import st from './Modal.module.scss';
import Cross from '@/shared/assets/сross.svg?react';
import { Button } from '..';

interface ModalProps extends ComponentProps<'div'> {
  onClose: () => void;
  title?: string;
}

const Modal: FC<ModalProps> = ({
  title = '',
  onClose,
  children,
  className = '',
  ...props
}) => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];

    body.className += ' block_scroll';

    return () => {
      body.className = body.className.replace(' block_scroll', '');
    };
  }, []);

  const clickBody = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={st.modal} onClick={onClose} {...props}>
      <div className={`${className} ${st.modal__body}`} onClick={clickBody}>
        <Button
          variant='text'
          StartIcon={<Cross />}
          className={st.modal__close}
          onClick={onClose}
        ></Button>
        <h2 className={st.modal__title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
