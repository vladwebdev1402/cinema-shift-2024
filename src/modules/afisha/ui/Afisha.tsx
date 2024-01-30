import { FilmCard } from '@/components/FilmCard';
import { useGetAllFilmsQuery } from '..';
import st from './Afisha.module.scss';

const Afisha = () => {
  const { data, isLoading, isError } = useGetAllFilmsQuery();

  return (
    <div className={`container ${st.afisha}`}>
      <h2 className={st.afisha__head}>Афиша</h2>
      <div className={st.afisha__body}>
        {data &&
          data.films.map((film) => <FilmCard film={film} key={film.id} />)}
      </div>
    </div>
  );
};

export default Afisha;
