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


export interface CreateProjectRequestDto {
    name: string,
    startDate: string,
    endDate: string,
    description: string
}