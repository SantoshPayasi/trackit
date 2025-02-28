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
    }
    getAllTasks(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.taskService.getAllTasksService();
                if (result.success === false) {
                    responseHandler_utils_1.default.sendError(response, result.message, result.status, result.error);
                    return;
                }
                responseHandler_utils_1.default.sendSuccess(response, result.message, result.data, result.status);
            }
            catch (error) {
                logger_utils_1.default.error("Task Controller:getAllTasks", error === null || error === void 0 ? void 0 : error.message);
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
                logger_utils_1.default.error("Task Controller:createNewTask", error === null || error === void 0 ? void 0 : error.message);
                return next(error);
            }
        });
    }
}
const taskRepository = new task_repository_1.default();
exports.default = new TaskController(new task_service_1.default(taskRepository));
