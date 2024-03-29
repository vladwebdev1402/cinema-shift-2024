import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATHS } from '@/shared/constants';
import { IFilm } from '@/shared/types';
import { Button, Rating } from '@/ui';
import { FilmCardHead } from '.';
import st from './FilmCard.module.scss';

interface Props {
  film: IFilm;
}

const FilmCard: FC<Props> = ({ film }) => {
  const navigate = useNavigate();

  const moreClick = () => {
    navigate(ROUTER_PATHS.navFilmDetail(film.id));
  };

  return (
    <div className={st.film}>
      <FilmCardHead
        date={film.releaseDate}
        genres={film.genres}
        img={film.img}
        country={film.country.name}
      />
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
        <Button onClick={moreClick} fullWidth>
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default FilmCard;
