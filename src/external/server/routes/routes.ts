import { NextFunction, Router } from "express";

import UserRoutes from "./_user";
import { knex } from "@external/database/database";

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('rota inicial');
})

router.get('/hello', async (req, res) => {
    const tables = await knex('sqlite_schema').select('*');

    res.json(tables);
    return;
})

router.use(UserRoutes)

export {
    router
}