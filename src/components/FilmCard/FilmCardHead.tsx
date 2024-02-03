import { FC } from 'react';

import { API_URL } from '@/shared/constants';
import st from './FilmCard.module.scss';

interface Props {
  img: string;
  genres: string[];
  date: string;
  country: string;
  className?: string;
}

const FilmCardHead: FC<Props> = ({
  date,
  country,
  genres,
  img,
  className = '',
}) => (
  <div className={`${className} ${st.film__head}`}>
    <img className={st.film__img} src={API_URL + img} />
    <div className={st.film__genres}>
      <div className={st.film__genre}>{genres[0]}</div>
      <div className={st.film__country}>
        {country}
        {date.split(' ')[2] ? `, ${date.split(' ')[2]}` : ''}
      </div>
    </div>
  </div>
);

export default FilmCardHead;
