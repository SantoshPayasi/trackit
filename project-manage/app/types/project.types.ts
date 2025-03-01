import { Task } from "./task.types";

export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    tasks?: Task[]
    projectTeams: any[]
}