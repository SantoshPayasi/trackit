import { PrismaClient } from "@prisma/client";
import { CreateTaskRequestDto, TaskDto, TaskPriorityDto, TaskStatusDto } from "../../application/dtos/task.dtos";
import ITaskRepository from "../../application/interfaces/taskrepo.interface";
const prisma = new PrismaClient();
class TaskRepository implements ITaskRepository {
    async findAll(): Promise<TaskDto[]> {
        const tasks: TaskDto[] = (await prisma.task.findMany()).map(task => ({
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