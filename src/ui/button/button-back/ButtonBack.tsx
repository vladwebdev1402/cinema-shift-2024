import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import st from './ButtonBack.module.scss';
import Arrow from '@/shared/assets/arrow-left.svg?react';

interface Props {
  className?: string;
}

const ButtonBack: FC<Props> = ({ className = '' }) => {
  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1);
  };

  return (
    <button className={`${className} ${st.button}`} onClick={backClick}>
      <Arrow />
      Назад
    </button>
  );
};

export default ButtonBack;
