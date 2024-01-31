import { ISeance, THallName } from '@/shared/types';

export interface IGroupedHalls {
  name: THallName;
  times: string[];
}

export const groupByHall = (seances: ISeance[]) => {
  return seances.reduce((acc: IGroupedHalls[], seance) => {
    const hallName = seance.hall.name;
    const hallInGroup = acc.find((group) => group.name === hallName);
    if (!hallInGroup)
      acc.push({
        name: hallName,
        times: [seance.time],
      });
    else {
      hallInGroup.times.push(seance.time);
    }

    return acc;
  }, []);
};
