import { PrismaClient } from "@prisma/client";
import { CreateTaskRequestDto, GetTasksDto, TaskDto, TaskPriorityDto, TaskStatusDto } from "../../application/dtos/task.dtos";
import ITaskRepository from "../../application/interfaces/taskrepo.interface";
const prisma = new PrismaClient();
class TaskRepository implements ITaskRepository {
    async updateStatus(taskId: number, status: string): Promise<any> {
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId)
            },
            data: {
                status: status
            }
        })
        return updatedTask
    }
    async find(input: GetTasksDto): Promise<TaskDto[]> {
        const tasks: TaskDto[] = (await prisma.task.findMany({
            where: {
                projectId: input.projectId
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true
            }
        })).map(task => ({
            ...task,
            status: task.status as TaskStatusDto,
            priority: task.priority as TaskPriorityDto
        }));
        return tasks
    }


    async create(task: CreateTaskRequestDto): Promise<any> {
        const newTask = await prisma.task.create({ data: task });
        return newTask;
    }

}

export default TaskRepository;