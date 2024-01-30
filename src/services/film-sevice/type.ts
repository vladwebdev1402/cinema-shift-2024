import { IFilm } from "@/shared/types";

export interface IAllFilmResponse {
    success: boolean,
    reason: string;
    films: IFilm[];
}

export interface IFilmByIdResponse {
    success: boolean,
    reason: string;
    film: IFilm;
}