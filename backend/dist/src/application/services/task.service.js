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
const statuscode_utils_1 = __importDefault(require("../../utils/statuscode.utils"));
const serviceResponse_dtos_1 = require("../dtos/serviceResponse.dtos");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        this.getAllTasksService = this.getAllTasksService.bind(this);
        this.createNewTaskService = this.createNewTaskService.bind(this);
        this.updateStatusService = this.updateStatusService.bind(this);
    }
    getAllTasksService(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { projectId: projectId };
                const tasks = yield this.taskRepository.find(query);
                if (!tasks || tasks.length === 0) {
                    return serviceResponse_dtos_1.ServiceResponse.failure("Tasks not found", false, statuscode_utils_1.default.NOT_FOUND);
                }
                return serviceResponse_dtos_1.ServiceResponse.success(true, statuscode_utils_1.default.OK, tasks, "Tasks retrieved successfully");
            }
            catch (error) {
                return serviceResponse_dtos_1.ServiceResponse.failure("An error occurred while retrieving tasks", false, statuscode_utils_1.default.SERVER_ERROR, error);
            }
        });
    }
    createNewTaskService(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTask = yield this.taskRepository.create(task);
                if (!newTask) {
                    return serviceResponse_dtos_1.ServiceResponse.failure("Task not created", false, statuscode_utils_1.default.BAD_REQUEST);
                }
                return serviceResponse_dtos_1.ServiceResponse.success(true, statuscode_utils_1.default.CREATED, newTask, "Task created successfully");
            }
            catch (error) {
                return serviceResponse_dtos_1.ServiceResponse.failure("An error occurred while creating task", false, statuscode_utils_1.default.SERVER_ERROR, error);
            }
        });
    }
    updateStatusService(taskId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield this.taskRepository.updateStatus(taskId, status);
                if (!updatedTask) {
                    return serviceResponse_dtos_1.ServiceResponse.failure("Task not updated", false, statuscode_utils_1.default.BAD_REQUEST);
                }
                return serviceResponse_dtos_1.ServiceResponse.success(true, statuscode_utils_1.default.OK, updatedTask, "Task updated successfully");
            }
            catch (error) {
                return serviceResponse_dtos_1.ServiceResponse.failure("An error occurred while updating task", false, statuscode_utils_1.default.SERVER_ERROR, error);
            }
        });
    }
}
exports.default = TaskService;
