export interface ISchedule {
  date: string;
  seances: ISeance[];
}

export interface ISeance {
  time: string;
  hall: {
    name: THallName;
    places: IPlace[][];
  };
}

export interface IPlace {
  price: number;
  type: TPlaceType;
}

export type TPlaceType = 'ECONOM' | 'BLOCKED' | 'COMFORT';

export type THallName = 'Red' | 'Blue' | 'Green';

export enum EnumHallName {
  'Red' = 'Красный зал',
  'Green' = 'Зелёный зал',
  'Blue' = 'Синий зал',
}

export const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const monthToLocal = [
  'янв',
  'фев',
  'март',
  'апр',
  'май',
  'июнь',
  'июль',
  'авг',
  'сент',
  'окт',
  'нояб',
  'дек',
];
