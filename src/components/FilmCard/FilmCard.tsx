import { FC } from 'react';

import { IFilm } from '@/shared/types';
import st from './FilmCard.module.scss';
import { apiUrl } from '@/shared/constants';
import { Button, Rating } from '@/ui';

interface Props {
  film: IFilm;
}

const FilmCard: FC<Props> = ({ film }) => {
  return (
    <div className={st.film}>
      <div className={st.film__head}>
        <img className={st.film__img} src={apiUrl + film.img} />
        <div className={st.film__genres}>
          <div className={st.film__genre}>{film.genres[0]}</div>
          <div className={st.film__country}>
            США, {film.releaseDate.split(' ')[2]}
          </div>
        </div>
      </div>
      <div className={st.film__item}>
        <h3>{film.name}</h3>
        <div className={st.film__subtitle}>{film.releaseDate}</div>
      </div>
      <div className={`${st.film__item_subtitle} ${st.film__item}`}>
        <h3>Рейтинг</h3>
        <div className={`${st.film__rating}`}>
          Kinopoisk - <Rating rating={film.userRatings.kinopoisk} />
        </div>
      </div>
      <div className={`${st.film__item} ${st.film__more}`}>
        <Button>Подробнее</Button>
      </div>
    </div>
  );
};

export default FilmCard;
