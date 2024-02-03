import { FilmCard } from '@/components/FilmCard';
import st from './Afisha.module.scss';
import { useGetFilmsTodayQuery } from '@/services/film-sevice';
import AfishaSkeleton from './AfishaSkeleton';

const Afisha = () => {
  const { data, isLoading, isError } = useGetFilmsTodayQuery();

  return (
    <div className={`container ${st.afisha}`}>
      <h2 className={st.afisha__head}>Афиша</h2>

      <div className={st.afisha__body}>
        {data &&
          data.films.map((film) => <FilmCard film={film} key={film.id} />)}
        {isLoading && <AfishaSkeleton />}
      </div>
      {isError && (
        <h3 className={st.film__error}>
          Произошла ошибка при загрузке фильмов
        </h3>
      )}
    </div>
  );
};

export default Afisha;
