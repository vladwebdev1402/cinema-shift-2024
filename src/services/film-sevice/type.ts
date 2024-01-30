import { IFilm, ISchedule } from "@/shared/types";

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

export interface IFilmScheduleResponse {
    success: boolean,
    schedules: ISchedule[],
}