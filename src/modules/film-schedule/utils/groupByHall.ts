import { ISeance, THallName } from '@/shared/types';

export interface IGroupedHalls {
  name: THallName;
  seances: {
    time: string;
  }[];
}

export const groupByHall = (seances: ISeance[]) => {
  return seances.reduce((acc: IGroupedHalls[], seance) => {
    const hallName = seance.hall.name;
    const hallInGroup = acc.filter((group) => group.name === hallName)[0];
    if (!hallInGroup)
      acc.push({
        name: hallName,
        seances: [
          {
            time: seance.time,
          },
        ],
      });
    else {
        hallInGroup.seances.push({
            time: seance.time,
        })
    }

    return acc;
  }, []);
};
