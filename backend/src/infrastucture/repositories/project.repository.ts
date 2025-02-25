import { PrismaClient } from "@prisma/client";
import IProjectRepository from "../../application/interfaces/projectrepo.interface";


const prisma = new PrismaClient();
export class ProjectReposity implements IProjectRepository {

    async findAll(): Promise<any[]> {
        const projects = await prisma.project.findMany();
        return projects
    }

}