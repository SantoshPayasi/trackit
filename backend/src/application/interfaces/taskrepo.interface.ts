import { CreateTaskRequestDto, TaskDto } from "../dtos/task.dtos"

interface ITaskRepository {
    findAll(): Promise<any>
    create(task: CreateTaskRequestDto): Promise<any>
}


export default ITaskRepository;