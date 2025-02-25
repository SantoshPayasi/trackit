import { ApiError } from "../../utils/errorHandler.utils";
import StatusCode from "../../utils/statuscode.utils";
import { ServiceResponse } from "../dtos/serviceResponse.dtos";
import IProjectRepository from "../interfaces/projectrepo.interface";

export class ProjectService {
    constructor(private projectRepository: IProjectRepository) { }

    async getAllProjects() {
        try {
            const projects = await this.projectRepository.findAll();
            if (!projects) {
                return ServiceResponse.failure("Projects not found", false, StatusCode.NOT_FOUND);
            }
            return ServiceResponse.success(true, StatusCode.OK, projects);
        } catch (error: any) {
            throw new ApiError(error.message, StatusCode.SERVER_ERROR);
        }
    }
}
