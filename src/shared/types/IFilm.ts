import { IActor } from "./IActor";
import { TAgeRating } from "./TAgeRating";

export interface IFilm {
    id: string;
    name: string;
    orignalName: string;
    description: string;
    releaseDate: string;
    actors: IActor[];
    directors: IActor[];
    runtime: number;
    ageRating: TAgeRating;
    genres: string[];
    useRatings: {
        kinopoisk: string;
        imdb: string;
    };
    img: string;
}