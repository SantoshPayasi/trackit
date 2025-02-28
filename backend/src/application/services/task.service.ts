import StatusCode from "../../utils/statuscode.utils";
import { ServiceResponse } from "../dtos/serviceResponse.dtos";
import { CreateTaskRequestDto, TaskDto } from "../dtos/task.dtos";
import ITaskRepository from "../interfaces/taskrepo.interface";

class TaskService {
    constructor(private taskRepository: ITaskRepository) {
        this.getAllTasksService = this.getAllTasksService.bind(this);
    }

    async getAllTasksService(): Promise<ServiceResponse<TaskDto[] | null>> {
        try {
            const tasks: TaskDto[] = await this.taskRepository.findAll();

            if (!tasks || tasks.length === 0) {
                return ServiceResponse.failure("Tasks not found", false, StatusCode.NOT_FOUND);
            }


            return ServiceResponse.success(true, StatusCode.OK, tasks, "Tasks retrieved successfully");
        } catch (error) {
            return ServiceResponse.failure("An error occurred while retrieving tasks", false, StatusCode.SERVER_ERROR, error);
        }
    }


    async createNewTaskService(task: CreateTaskRequestDto): Promise<ServiceResponse<TaskDto | null>> {
        try {
            const newTask = await this.taskRepository.create(task);
            if (!newTask) {
                return ServiceResponse.failure("Task not created", false, StatusCode.BAD_REQUEST);
            }
            return ServiceResponse.success(true, StatusCode.CREATED, newTask, "Task created successfully");
        } catch (error) {
            return ServiceResponse.failure("An error occurred while creating task", false, StatusCode.SERVER_ERROR, error);
        }
    }
}



export default TaskService