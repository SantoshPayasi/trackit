import { User } from "./user.types";

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog"
}

export enum Status {
    ToDo = "To Do",
    InProgress = "Work In Progress",
    Done = "Done",
    UnerReview = "Under Review"
}


export interface Attachment {
    id: number,
    filename: string,
    fileURL: string,
    taskId: number,
    uploadedById: number
}

export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: Status | null;
    priority: Priority | null;
    tags: string | null;
    startDate: Date | null;
    dueDate: Date | null;
    projectId: number;
    authorUserId: number;
    assignedUserId: number | null;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];

}


export interface GetTaskRequestDto {
    projectId: number;
}


export interface updateStatusDto {
    taskId: number;
    status: Status;
}
