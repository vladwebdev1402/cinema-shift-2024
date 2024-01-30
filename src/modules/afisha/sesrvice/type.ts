import { IFilm } from "@/shared/types";

export interface IAllFilmResponse {
    success: boolean,
    reason: string;
    films: IFilm[];
}