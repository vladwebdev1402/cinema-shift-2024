import { TProfession } from "./TProfession";

export interface IActor {
    id: string;
    professions: TProfession[];
    fullName: string;
}