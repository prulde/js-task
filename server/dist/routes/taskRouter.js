"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskController_1 = __importDefault(require("../controllers/taskController"));
const Router = require("express");
const taskRouter = new Router();
const completeTaskRouter = new Router();
taskRouter.post("/all", taskController_1.default.create);
taskRouter.put("/all/:id", taskController_1.default.change);
//taskRouter.put("/all/:id", taskController.markAsCompleted); // use next()?
taskRouter.get("/all", taskController_1.default.getAll);
taskRouter.get("/all/:id", taskController_1.default.getOne);
taskRouter.get("/completed", taskController_1.default.getCompleted);
taskRouter.get("/uncompleted", taskController_1.default.getUncompleted);
taskRouter.delete("/all/:id", taskController_1.default.delete);
exports.default = taskRouter;
