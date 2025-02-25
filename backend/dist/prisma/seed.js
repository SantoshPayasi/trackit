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
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const modelNames = orderedFileNames.map((filename) => {
            const modelName = path_1.default.basename(filename, path_1.default.extname(filename));
            return modelName.charAt(0).toUpperCase() + modelName.slice(1);
        });
        for (const modelName of modelNames) {
            const model = prisma[modelName];
            yield model.deleteMany({});
            console.log(`Deleted all data from ${modelName}`);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const directory = path_1.default.join(__dirname, 'seedData');
        const fileNames = [
            'team.json',
            'project.json',
            'projectTeam.json',
            'user.json',
            'task.json',
            'attachment.json',
            'comment.json',
            'taskAssignement.json',
        ];
        yield deleteAllData(fileNames);
        for (const fileName of fileNames) {
            const filePath = path_1.default.join(directory, fileName);
            const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const model = prisma[modelName];
            for (const item of data) {
                yield model.create({ data: item });
            }
            console.log(`Data seeded for ${modelName} with data of ${fileName}`);
        }
    });
}
main()
    .catch((e) => {
    console.log(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return prisma.$disconnect(); }));
