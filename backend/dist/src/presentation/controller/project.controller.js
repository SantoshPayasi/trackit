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
const project_service_1 = require("../../application/services/project.service");
const responseHandler_utils_1 = __importDefault(require("../../utils/responseHandler.utils"));
const project_repository_1 = require("../../infrastucture/repositories/project.repository");
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.getAllProjects = this.getAllProjects.bind(this);
        this.createNewProject = this.createNewProject.bind(this);
    }
    getAllProjects(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_utils_1.default.info("Project Controller:getAllProjects", "get request in getAllProjects in project controller");
                const result = yield this.projectService.getAllProjects();
                if (result.success === false) {
                    return responseHandler_utils_1.default.sendError(response, result.message, result.status, result.error);
                }
                return responseHandler_utils_1.default.sendSuccess(response, result.message, result.data, result.status);
            }
            catch (error) {
                logger_utils_1.default.error(error.message);
                next(error);
            }
        });
    }
    createNewProject(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectInput } = request.body;
                const result = yield this.projectService.createNewProject(projectInput);
                if (result.success === false) {
                    return responseHandler_utils_1.default.sendError(response, result.message, result.status, result.error);
                }
                return responseHandler_utils_1.default.sendSuccess(response, result.message, result.data, result.status);
            }
            catch (error) {
                logger_utils_1.default.error("Project Controller:createNewProject", error === null || error === void 0 ? void 0 : error.message);
                return next(error);
            }
        });
    }
}
const projectRepo = new project_repository_1.ProjectReposity();
exports.default = new ProjectController(new project_service_1.ProjectService(projectRepo));
