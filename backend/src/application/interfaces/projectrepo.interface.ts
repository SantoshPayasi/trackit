import { ProjectCreateRequestDto } from "../dtos/project.dtos";

interface IProjectRepository {
    findAll(): Promise<any>;
    create(project: ProjectCreateRequestDto): Promise<any>;
}


export default IProjectRepository