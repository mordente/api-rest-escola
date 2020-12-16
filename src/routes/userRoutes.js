import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';
const router = new Router();


//router.get('/', UserController.index); // Lista todos os usuários
//router.get('/:id', UserController.retrieve); // Mostra as informaçoes de um usuário


router.post('/', UserController.store);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;
