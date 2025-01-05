import { Router } from "express";

import { AuthController } from "@/adapters/controllers/Auth.Controller";

const router: Router = Router();
const AUTH = new AuthController();

router.post('/login', AUTH.login);
router.post('/logout', AUTH.logout);
router.get('/me', AUTH.me);

export default router