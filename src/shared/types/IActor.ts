import { TProfession } from "./TProffession";

export interface IActor {
    id: string;
    proffessions: TProfession[];
    fullName: string;
}