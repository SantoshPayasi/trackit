"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const project_controller_1 = __importDefault(require("../controller/project.controller"));
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", project_controller_1.default.getAllProjects);
router.post("/create", project_controller_1.default.createNewProject);
