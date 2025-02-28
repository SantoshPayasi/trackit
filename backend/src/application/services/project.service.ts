import { ApiError } from "../../utils/errorHandler.utils";
import logger from "../../utils/logger.utils";
import StatusCode from "../../utils/statuscode.utils";
import { ProjectCreateRequestDto } from "../dtos/project.dtos";
import { ServiceResponse } from "../dtos/serviceResponse.dtos";
import IProjectRepository from "../interfaces/projectrepo.interface";

export class ProjectService {
    constructor(private projectRepository: IProjectRepository) {
        this.getAllProjects = this.getAllProjects.bind(this);
        this.createNewProject = this.createNewProject.bind(this);
    }

    async getAllProjects() {
        try {
            const projects = await this.projectRepository.findAll();
            if (!projects) {
                return ServiceResponse.failure("Projects not found", false, StatusCode.NOT_FOUND);
            }
            return ServiceResponse.success(true, StatusCode.OK, projects);
        } catch (error: any) {
            logger.error("Project Service Error:getAllProjects", error);
            throw new ApiError(error.message, StatusCode.SERVER_ERROR);
        }
    }


    async createNewProject(project: ProjectCreateRequestDto) {
        try {
            const newProject = await this.projectRepository.create(project);

            if (!newProject) {
                return ServiceResponse.failure("Project not created", false, StatusCode.BAD_REQUEST);
            }
            return ServiceResponse.success(true, StatusCode.CREATED, newProject);
        } catch (error: any) {
            logger.error("Project Service Error:getAllProjects", error);
            throw new ApiError(error.message, StatusCode.SERVER_ERROR);
        }
    }
}
