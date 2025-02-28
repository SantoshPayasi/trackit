"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("../controller/task.controller"));
const router = express_1.default.Router();
exports.router = router;
router.get("/", task_controller_1.default.getAllTasks);
router.post("/create", task_controller_1.default.createNewTask);
