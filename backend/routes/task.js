import express from 'express';
import task from '../controllers/taskController.js';

const router = express.Router();

router.post("/register", task.register);
router.get("/listByStatus/:status?", task.listAllByStatus);
router.get("/listByUser/:email?", task.listTaskByUser);
router.put("/updateToProgress/:_id", task.updateToInProgress);
router.put("/updateToDo/:_id", task.updateTo_ToDo);
router.put("/updateToFinish/:_id", task.updateToFinish);
router.delete("/delete/:_id", task.deleteTask);

export default router;