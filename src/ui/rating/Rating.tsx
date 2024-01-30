import { FC } from 'react';
import st from './Rating.module.scss';

interface Props {
  rating: string;
}

const Rating: FC<Props> = ({ rating }) => {
  return (
    <div className={st.rating}>
      {[0, 1, 2, 3, 4].map((number) => {
        const rate = Number(rating) - 2 * number;
        return (
          <div className={st.rating__star} key={number}>
            <div
              className={st.rating__star_yellow}
              style={{ width: rate > 2 ? '100%' : `${rate * 50}%` }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
