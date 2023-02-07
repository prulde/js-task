import { Response, Request } from "express";
import taskController from "../controllers/taskController";
const Router = require("express");
const taskRouter = new Router();
const completeTaskRouter = new Router();

taskRouter.post("/all", taskController.create);
taskRouter.put("/all/:id", taskController.change);
//taskRouter.put("/all/:id", taskController.markAsCompleted); // use next()?
taskRouter.get("/all", taskController.getAll);
taskRouter.get("/all/:id", taskController.getOne);
taskRouter.get("/completed", taskController.getCompleted);
taskRouter.get("/uncompleted", taskController.getUncompleted);
taskRouter.delete("/all/:id", taskController.delete);

export default taskRouter;