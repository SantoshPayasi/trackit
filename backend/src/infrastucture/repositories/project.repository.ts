import { PrismaClient } from "@prisma/client";
import IProjectRepository from "../../application/interfaces/projectrepo.interface";
import { ProjectCreateRequestDto } from "../../application/dtos/project.dtos";


const prisma = new PrismaClient();
export class ProjectReposity implements IProjectRepository {
    async create(project: ProjectCreateRequestDto): Promise<any> {
        const newProject = await prisma.project.create({ data: project });
        return newProject;
    }

    async findAll(): Promise<any[]> {
        const projects = await prisma.project.findMany();
        return projects
    }

}