import { Router } from "express";

import { UserController } from "@adapters/controllers/User.Controller";
import { LoginController } from "@/adapters/controllers/Login.Controller";

const router: Router = Router();
const USER = new UserController();
const LOGIN = new LoginController();
const routeBase = "/users"

router.post('/login', LOGIN.login);

router.post(`${routeBase}/create`, USER.create);
router.get(`${routeBase}/users`, USER.readAll);
router.get(`${routeBase}/user/:id`, USER.readOne);
router.put(`${routeBase}/user/:id/update`, USER.update);
router.delete(`${routeBase}/user/:id`, USER.delete);

export default router