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
exports.ProjectReposity = void 0;
const client_1 = require("@prisma/client");
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
const prisma = new client_1.PrismaClient();
class ProjectReposity {
    create(project) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_utils_1.default.info("Project Repository:createNewProject", "create request in project repository", project);
            const newProject = yield prisma.project.create({ data: project });
            return newProject;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield prisma.project.findMany();
            return projects;
        });
    }
}
exports.ProjectReposity = ProjectReposity;
