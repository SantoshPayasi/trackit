"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_route_1 = require("./project.route");
const task_route_1 = require("./task.route");
const routes_config_1 = __importDefault(require("../../config/routes.config"));
const router = (0, express_1.Router)();
router.use(routes_config_1.default.PROJECTS, project_route_1.router);
router.use(routes_config_1.default.TASKS, task_route_1.router);
exports.default = router;
