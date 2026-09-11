import { Router } from "express"
import { authMiddleware } from "../middleware/auth.js";
import { handleAllTasks, handleCreateNewTask, handleDeleteTaskById, handleGetTaskById, handleUpdateTaskById } from "../Controllers/task.js";

const TaskRouter = Router();

TaskRouter.route('/')
.get(authMiddleware, handleAllTasks)
.post(authMiddleware, handleCreateNewTask)

TaskRouter.route('/:id')
.get(authMiddleware, handleGetTaskById)

.patch(authMiddleware, handleUpdateTaskById)

.delete(authMiddleware, handleDeleteTaskById)


export default TaskRouter;