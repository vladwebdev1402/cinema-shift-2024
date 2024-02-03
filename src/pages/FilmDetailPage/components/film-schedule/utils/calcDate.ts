import { daysOfWeek, monthToLocal } from "@/shared/types";
import { formateDate } from "@/shared/utils";

export const calcDate = (date: string) => {
    const currentDate = formateDate(date);
    const dayWeek = currentDate.getDay();
    const month = monthToLocal[currentDate.getMonth()];
    const day = currentDate.getDate();

    return {
        dayWeek: daysOfWeek[dayWeek], month, day
    }
}