import { FC } from 'react';

import st from './FilmCardDesription.module.scss';
import { IFilm } from '@/shared/types';
import { FilmCardHead } from '@/components/FilmCard';

interface Props {
  film: IFilm;
}

const FilmFullDescription: FC<Props> = ({ film }) => {
  return (
    <div>
      <FilmCardHead
        date={film.releaseDate}
        genres={film.genres}
        img={film.img}
      />
    </div>
  );
};

export default FilmFullDescription;
