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
exports.ProjectService = void 0;
const errorHandler_utils_1 = require("../../utils/errorHandler.utils");
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
const statuscode_utils_1 = __importDefault(require("../../utils/statuscode.utils"));
const serviceResponse_dtos_1 = require("../dtos/serviceResponse.dtos");
class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
        this.getAllProjects = this.getAllProjects.bind(this);
        this.createNewProject = this.createNewProject.bind(this);
    }
    getAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.projectRepository.findAll();
                if (!projects) {
                    return serviceResponse_dtos_1.ServiceResponse.failure("Projects not found", false, statuscode_utils_1.default.NOT_FOUND);
                }
                return serviceResponse_dtos_1.ServiceResponse.success(true, statuscode_utils_1.default.OK, projects);
            }
            catch (error) {
                logger_utils_1.default.error("Project Service Error:getAllProjects", error);
                throw new errorHandler_utils_1.ApiError(error.message, statuscode_utils_1.default.SERVER_ERROR);
            }
        });
    }
    createNewProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProject = yield this.projectRepository.create(project);
                if (!newProject) {
                    return serviceResponse_dtos_1.ServiceResponse.failure("Project not created", false, statuscode_utils_1.default.BAD_REQUEST);
                }
                return serviceResponse_dtos_1.ServiceResponse.success(true, statuscode_utils_1.default.CREATED, newProject);
            }
            catch (error) {
                logger_utils_1.default.error("Project Service Error:getAllProjects", error);
                throw new errorHandler_utils_1.ApiError(error.message, statuscode_utils_1.default.SERVER_ERROR);
            }
        });
    }
}
exports.ProjectService = ProjectService;
