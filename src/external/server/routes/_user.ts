import { Router } from "express"

import { UserController } from "@adapters/controllers/User.Controller";

const router: Router = Router();
const USER = new UserController();
const routeBase = "/users"

router.post(`${routeBase}/create`, USER.create);

export default router