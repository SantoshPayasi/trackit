import { NextFunction, Request, Response } from "express";
import TaskService from "../../application/services/task.service";
import logger from "../../utils/logger.utils";
import ResponseHandler from "../../utils/responseHandler.utils";
import { CreateTaskRequestDto } from "../../application/dtos/task.dtos";
import TaskRepository from "../../infrastucture/repositories/task.repository";

class TaskController {
    constructor(private taskService: TaskService) {
        this.getAllTasks = this.getAllTasks.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    async getAllTasks(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const projectId = Number(request.query.projectId);
            if (isNaN(projectId)) {
                ResponseHandler.sendError(response, "Invalid projectId", 400);
                return;
            }

            const result = await this.taskService.getAllTasksService(projectId);
            if (result.success === false) {
                ResponseHandler.sendError(response, result.message, result.status, result.error);
                return;
            }
            ResponseHandler.sendSuccess(response, result.message, result.data, result.status);
        } catch (error: any) {
            logger.error("Task Controller:getAllTasks", error);
            return next(error);
        }
    }

    async createNewTask(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const taskData: CreateTaskRequestDto = request.body;
            const result = await this.taskService.createNewTaskService(taskData);
            if (result.success === false) {
                ResponseHandler.sendError(response, result.message, result.status, result.error);
                return;
            }
            ResponseHandler.sendSuccess(response, result.message, result.data, result.status);
        } catch (error: any) {
            logger.error("Task Controller:createNewTask", error);
            return next(error);
        }
    }

    async updateStatus(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const taskId = Number(request.query.taskId);
            const status = request.body.status;
            const result = await this.taskService.updateStatusService(taskId, status);
            if (result.success === false) {
                ResponseHandler.sendError(response, result.message, result.status, result.error);
                return;
            }
            ResponseHandler.sendSuccess(response, result.message, result.data, result.status);
        } catch (error: any) {
            logger.error("Task Controller:updateStatus", error);
            return next(error);
        }
    }
}

const taskRepository = new TaskRepository();

export default new TaskController(new TaskService(taskRepository));