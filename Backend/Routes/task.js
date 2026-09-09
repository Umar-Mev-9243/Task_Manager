import { Router } from "express"
import Task from "../model/task.js";
import { authMiddleware } from "../middleware/auth.js";
import { handleAllTasks, handleCreateNewTask, handleDeleteTaskById, handleGetTaskById, handleUpdateTaskById } from "../Controllers/task.js";

const TaskRouter = Router();

TaskRouter.route('/')
.get(authMiddleware, handleAllTasks)
.post(authMiddleware, handleCreateNewTask)

TaskRouter.route('/:id')
.get(handleGetTaskById)

.patch(handleUpdateTaskById)

.delete(handleDeleteTaskById)


export default TaskRouter;