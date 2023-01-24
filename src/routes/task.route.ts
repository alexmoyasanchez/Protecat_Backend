import { Router } from "express"; 
import taskController from "../controllers/task.controller";
import { isAdmin } from "../middelware/authJWT";

const router = Router();

router.get('/', taskController.getAllTasks);
router.get('/getTask/:id', taskController.getTask);
router.get('/getTaskByUser/:email', taskController.getTaskByUser);
router.post('/new/:userId', [isAdmin],taskController.newTask);
router.put('/update/:id/:userId', [isAdmin], taskController.updateTask);
router.put('/check/:id', taskController.taskDone);
router.put('/uncheck/:id', taskController.taskNotDone);
router.put('/assignTask/:id/:user/:userId', [isAdmin], taskController.assignTask);
router.delete('/delete/:id/:userId', [isAdmin], taskController.deleteTask);

export default router;