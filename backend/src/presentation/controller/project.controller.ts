import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../../application/services/project.service";
import ResponseHandler from "../../utils/responseHandler.utils";
import { ProjectReposity } from "../../infrastucture/repositories/project.repository";
import logger from "../../utils/logger.utils";

class ProjectController {
    constructor(private projectService: ProjectService) {
        this.getAllProjects = this.getAllProjects.bind(this);
        this.createNewProject = this.createNewProject.bind(this)
    }

    async getAllProjects(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("Project Controller:getAllProjects", "get request in getAllProjects in project controller")
            const result = await this.projectService.getAllProjects();
            if (result.success === false) {
                return ResponseHandler.sendError(response, result.message, result.status, result.error);
            }
            return ResponseHandler.sendSuccess(response, result.message, result.data, result.status);
        } catch (error: any) {
            logger.error(error.message)
            next(error)
        }
    }


    async createNewProject(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const { projectInput } = request.body;

            const result = await this.projectService.createNewProject(projectInput);
            if (result.success === false) {
                return ResponseHandler.sendError(response, result.message, result.status, result.error)
            }
            return ResponseHandler.sendSuccess(response, result.message, result.data, result.status)
        } catch (error: any) {
            logger.error("Project Controller:createNewProject", error?.message)
            return next(error)
        }
    }
}

const projectRepo = new ProjectReposity()


export default new ProjectController(new ProjectService(projectRepo));