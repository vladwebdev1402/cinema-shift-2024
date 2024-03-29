import { monthToLocal } from "@/shared/types";
import { formateDate } from "@/shared/utils"

const DATE_TO_DAYWEEK = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
]

export const convertDate = (currentDate: string) => {
    const date = formateDate(currentDate);
    const day = date.getDate();
    const dayWeek = DATE_TO_DAYWEEK[date.getDay()];
    const month = monthToLocal[date.getMonth()];
    return `${day} ${month}, ${dayWeek}`
}