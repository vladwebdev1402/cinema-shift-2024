import { THallName } from "@/shared/types";

export interface ScheduleState {
    date: string;
    time: string;
    hall: THallName | '';
}