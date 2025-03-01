import StatusCode from "../../utils/statuscode.utils";
import { ServiceResponse } from "../dtos/serviceResponse.dtos";
import { CreateTaskRequestDto, GetTasksDto, TaskDto } from "../dtos/task.dtos";
import ITaskRepository from "../interfaces/taskrepo.interface";

class TaskService {
    constructor(private taskRepository: ITaskRepository) {
        this.getAllTasksService = this.getAllTasksService.bind(this);
        this.createNewTaskService = this.createNewTaskService.bind(this);
        this.updateStatusService = this.updateStatusService.bind(this);
    }

    async getAllTasksService(projectId: number): Promise<ServiceResponse<TaskDto[] | null>> {
        try {
            const query: GetTasksDto = { projectId: projectId };
            const tasks: TaskDto[] = await this.taskRepository.find(query);

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


    async updateStatusService(taskId: number, status: string): Promise<ServiceResponse<TaskDto | null>> {
        try {
            const updatedTask = await this.taskRepository.updateStatus(taskId, status);
            if (!updatedTask) {
                return ServiceResponse.failure("Task not updated", false, StatusCode.BAD_REQUEST);
            }
            return ServiceResponse.success(true, StatusCode.OK, updatedTask, "Task updated successfully");
        } catch (error) {
            return ServiceResponse.failure("An error occurred while updating task", false, StatusCode.SERVER_ERROR, error);
        }
    }
}



export default TaskService