import { Router } from "express";
import { router as projectRouter } from "./project.route"
import { router as taskRouter } from "./task.route"
import Routes from "../../config/routes.config"

const router = Router();




router.use(Routes.PROJECTS, projectRouter);
router.use(Routes.TASKS, taskRouter)



export default router