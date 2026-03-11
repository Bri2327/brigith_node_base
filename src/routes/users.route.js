import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import validate from '../validate/validate.js';
import {schema} from '../validate/user.validate.js';
import {authenticateToken} from '../middlewares/authenticate.middleware.js';

const router = Router();

router.route('/bulk').post(userController.bulkUsers);
router.route('/list/pagination').get(userController.getAll);

router.route('/')
  .get(userController.get)
  .post(validate(schema), userController.create);

router.route('/:id')
  .get(authenticateToken, userController.find)
  .put(authenticateToken, validate(schema), userController.update)
  .patch(authenticateToken, userController.activateInactivate)
  .delete(authenticateToken, userController.eliminar);

router.route('/:id/tasks').get(authenticateToken, userController.getTasks)
export default router