const Router = require("express");
const router = new Router();
import taskRouter from "./taskRouter";

router.use("/task", taskRouter);

export default router;