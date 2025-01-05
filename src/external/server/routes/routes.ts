import { NextFunction, Router } from "express";

import UserRoutes from "./_user";
import { knex } from "@external/database/database";

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('rota inicial');
})


router.use(UserRoutes)

export {
    router
}