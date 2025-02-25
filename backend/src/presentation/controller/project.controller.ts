import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../../application/services/project.service";
import ResponseHandler from "../../utils/responseHandler.utils";

class ProjectController {
    constructor(private projectService: ProjectService) { }

    async getAllProjects(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.projectService.getAllProjects();
            if (result.success === false) {
                return ResponseHandler.sendError(response, result.message, result.status, result.error);
            }
            return ResponseHandler.sendSuccess(response, result.message, result.data, result.status);
        } catch (error) {
            next(error)
        }
    }
}



