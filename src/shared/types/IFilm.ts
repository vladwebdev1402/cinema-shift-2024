import { IActor } from "./IActor";
import { TAgeRating } from "./TAgeRating";

export interface IFilm {
    id: string;
    name: string;
    originalName: string;
    description: string;
    releaseDate: string;
    actors: IActor[];
    directors: IActor[];
    runtime: number;
    ageRating: TAgeRating;
    genres: string[];
    userRatings: {
        kinopoisk: string;
        imdb: string;
    };
    img: string;
   country: {
        name: string,
        code: string,
        code2: string,
        id: number;
      }
}