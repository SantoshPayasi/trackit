import { CreateTaskRequestDto, GetTasksDto, TaskDto } from "../dtos/task.dtos"

interface ITaskRepository {
    find(input: GetTasksDto): Promise<any>
    create(task: CreateTaskRequestDto): Promise<any>
    updateStatus(taskId: number, status: string): Promise<any>
}


export default ITaskRepository;