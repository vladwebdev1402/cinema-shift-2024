import { FilmCard } from '@/components/FilmCard';
import { useGetAllFilmsQuery } from '..';
import st from './Afisha.module.scss';
import { Skeleton } from '@/ui';

const Afisha = () => {
  const { data, isLoading, isError } = useGetAllFilmsQuery();

  return (
    <div className={`container ${st.afisha}`}>
      <h2 className={st.afisha__head}>Афиша</h2>
      {!isError && (
        <div className={st.afisha__body}>
          {data &&
            data.films.map((film) => <FilmCard film={film} key={film.id} />)}
          {isLoading && (
            <>
              <Skeleton className={st.afisha__skeleton} />
              <Skeleton className={st.afisha__skeleton} />
              <Skeleton className={st.afisha__skeleton} />
              <Skeleton className={st.afisha__skeleton} />
              <Skeleton className={st.afisha__skeleton} />
              <Skeleton className={st.afisha__skeleton} />
            </>
          )}
        </div>
      )}
      {true && (
        <h3 className={st.film__error}>
          Произошла ошибка при загрузке фильмов
        </h3>
      )}
    </div>
  );
};

export default Afisha;
