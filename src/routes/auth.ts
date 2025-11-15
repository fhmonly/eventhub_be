import express from 'express'
import { registerController } from '../controller/auth/register';
import { loginController } from '../controller/auth/login';
import { logoutAllController, logoutController } from '../controller/auth/logout';
import { refreshTokenController } from '../controller/auth/refresh';
var router = express.Router();

router.post('/register', ...registerController)
router.post('/login', ...loginController)
router.post('/logout', ...logoutController)
router.post('/logout-all', ...logoutAllController)
router.post('/refresh', ...refreshTokenController)

export default router;