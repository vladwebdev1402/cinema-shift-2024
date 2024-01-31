import { FC, useState } from 'react';
import ArrowBack from '@/shared/assets/arrow-left.svg?react';
import { useNavigate, useParams } from 'react-router-dom';

import st from './FilmCardDesription.module.scss';
import { FilmCardHead } from '@/components/FilmCard';
import { useGetFilmByIdQuery } from '@/services/film-sevice';
import { EnumAgeRating } from '@/shared/types';
import { Button, Rating } from '@/ui';
import DetailSkeleton from './DetailSkeleton';

const FilmFullDescription: FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetFilmByIdQuery(params?.id || '');

  const openClick = () => {
    setIsOpen(!isOpen);
  };

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={`container ${st.detail}`}>
      <Button
        variant='text'
        StartIcon={<ArrowBack />}
        className={st.detail__back}
        onClick={onClickBack}
      >
        Назад
      </Button>
      <div className={st.detail__wrapper}>
        {data && (
          <>
            <FilmCardHead
              country={data.film.country.name}
              className={st.detail__head}
              date={data.film.releaseDate}
              genres={data.film.genres}
              img={data.film.img}
            />
            <div className={st.detail__body}>
              <h1>
                {data.film.name} {EnumAgeRating[data.film.ageRating]}
              </h1>
              <div className={st.detail__release}>{data.film.releaseDate}</div>
              <div className={st.detail__rating}>
                <Rating rating={data.film.userRatings.kinopoisk} />
                <span>Kinopoisk: {data.film.userRatings.kinopoisk}</span>
              </div>
              <div
                className={`${st.detail__description} ${isOpen ? st.detail__description_open : ''}`}
              >
                {data.film.description}
              </div>
              <button className={st.detail__open} onClick={openClick}>
                {isOpen ? 'скрыть' : 'раскрыть'}
              </button>
            </div>
          </>
        )}
        {isLoading && <DetailSkeleton />}
        {isError && (
          <h2 className={st.detail__error}>
            При загрузке фильма произошла ошибка
          </h2>
        )}
      </div>
    </div>
  );
};

export default FilmFullDescription;
