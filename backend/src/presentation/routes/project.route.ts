import { Router } from "express";
import ProjectController from "../controller/project.controller"
const router = Router();


router.get("/", ProjectController.getAllProjects)

router.post("/create", ProjectController.createNewProject)



export { router }