import express from "express";
import taskController from "../controller/task.controller";

const router = express.Router();


router.get("/", taskController.getAllTasks);

router.post("/create", taskController.createNewTask);




export { router }