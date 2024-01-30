import { FilmCard } from '@/components/FilmCard';
import { IFilm } from '@/shared/types';

const film = {
  id: '1',
  name: 'Зеленая миля',
  originalName: 'The Green Mile',
  description:
    'Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.',
  releaseDate: '6 декабря 1999',
  actors: [
    {
      id: '1',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Том Хэнкс',
    },
    {
      id: '2',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Дэвид Морс',
    },
    {
      id: '3',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Бонни Хант',
    },
    {
      id: '4',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Майкл Кларк Дункан',
    },
    {
      id: '5',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Джеймс Кромуэлл',
    },
    {
      id: '6',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Майкл Джитер',
    },
    {
      id: '7',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Грэм Грин',
    },
    {
      id: '8',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Даг Хатчисон',
    },
    {
      id: '9',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Сэм Рокуэлл',
    },
    {
      id: '10',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Барри Пеппер',
    },
  ],
  directors: [
    {
      id: '1',
      professions: ['ACTOR', 'DIRECTOR'],
      fullName: 'Фрэнк Дарабонт',
    },
  ],
  runtime: 189,
  ageRating: 'R',
  genres: ['драма', 'фэнтези', 'криминал'],
  userRatings: {
    kinopoisk: '9.1',
    imdb: '8.6',
  },
  img: '/static/images/cinema/film_1.webp',
};

const MainPage = () => {
  return (
    <div className='container'>
      <FilmCard film={film as IFilm} />
    </div>
  );
};

export default MainPage;
