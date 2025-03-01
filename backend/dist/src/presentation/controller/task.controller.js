"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = __importDefault(require("../../application/services/task.service"));
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
const responseHandler_utils_1 = __importDefault(require("../../utils/responseHandler.utils"));
const task_repository_1 = __importDefault(require("../../infrastucture/repositories/task.repository"));
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.getAllTasks = this.getAllTasks.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }
    getAllTasks(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = Number(request.query.projectId);
                if (isNaN(projectId)) {
                    responseHandler_utils_1.default.sendError(response, "Invalid projectId", 400);
                    return;
                }
                const result = yield this.taskService.getAllTasksService(projectId);
                if (result.success === false) {
                    responseHandler_utils_1.default.sendError(response, result.message, result.status, result.error);
                    return;
                }
                responseHandler_utils_1.default.sendSuccess(response, result.message, result.data, result.status);
            }
            catch (error) {
                logger_utils_1.default.error("Task Controller:getAllTasks", error);
                return next(error);
            }
        });
    }
    createNewTask(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskData = request.body;
                const result = yield this.taskService.createNewTaskService(taskData);
                if (result.success === false) {
                    responseHandler_utils_1.default.sendError(response, result.message, result.status, result.error);
                    return;
                }
                responseHandler_utils_1.default.sendSuccess(response, result.message, result.data, result.status);
            }
            catch (error) {
                logger_utils_1.default.error("Task Controller:createNewTask", error);
                return next(error);
            }
        });
    }
    updateStatus(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = Number(request.query.id);
                const status = request.body.status;
                const result = yield this.taskService.updateStatusService(taskId, status);
                if (result.success === false) {
                    responseHandler_utils_1.default.sendError(response, result.message, result.status, result.error);
                    return;
                }
                responseHandler_utils_1.default.sendSuccess(response, result.message, result.data, result.status);
            }
            catch (error) {
                logger_utils_1.default.error("Task Controller:updateStatus", error);
                return next(error);
            }
        });
    }
}
const taskRepository = new task_repository_1.default();
exports.default = new TaskController(new task_service_1.default(taskRepository));
