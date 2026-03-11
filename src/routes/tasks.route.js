import {Router} from 'express';
import {authenticateToken} from '../middlewares/authenticate.middleware.js';
import taskController from '../controllers/task.controller.js';

const router = Router();

router.route('/')
  .get(taskController.get)
  .post(taskController.create);

router.route('/:id')
  .get(authenticateToken, taskController.find)
  .put(authenticateToken, taskController.update)
  .delete(authenticateToken, taskController.eliminar)
  .patch(authenticateToken, taskController.done);

export default router